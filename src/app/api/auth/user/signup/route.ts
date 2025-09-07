import jwt from "jsonwebtoken";
import { sendEmail } from "@/lib/sendEmail";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import { getUserModel } from "@/models/Users";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { firstName, username, email, password } = body;

    if (!firstName || !username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    firstName = firstName.toUpperCase().trim();
    username = username.trim();
    email = email.toLowerCase().trim();

    await connectDB();

    const User = getUserModel();
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { error: "This email is already in use." },
        { status: 409 }
      );
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { error: "This username is taken. Please choose a different one." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      firstName,
      email,
      password: hashedPassword,
    });

    const verificationToken = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${verificationToken}`;

    await sendEmail(
      newUser.email,
      "Verify your leetpulse account",
      `
  <div style="background:#0C0A09; padding:32px; font-family:Arial, sans-serif; color:#FAFAF9;">
    <div style="max-width:480px; margin:0 auto; background:#1C1917; border:1px solid #292524; border-radius:12px; overflow:hidden;">
      <!-- Header -->
      <div style="padding:24px; text-align:center; border-bottom:1px solid #292524;">
        <h1 style="margin:0; font-size:22px; color:#FAFAF9;">leetpulse</h1>
      </div>

      <!-- Body -->
      <div style="padding:24px;">
        <p style="margin:0 0 16px 0;">Hi <strong>${
          newUser.firstName
        }</strong>,</p>
        <p style="margin:0 0 24px 0; color:#A6A09B;">
          Welcome aboard! Click the button below to verify your account and start using leetpulse.
        </p>

        <div style="text-align:center; margin-bottom:24px;">
          <a href="${verificationUrl}"
             style="display:inline-block; padding:12px 24px; background:#F59E0B; color:#121212; font-weight:bold; text-decoration:none; border-radius:8px;">
            Verify Email
          </a>
        </div>

        <p style="margin:0; font-size:14px; color:#A6A09B;">
          ⚠️ This link will expire in <strong>1 hour</strong>.
        </p>
      </div>

      <!-- Footer -->
      <div style="padding:16px; text-align:center; font-size:12px; color:#A6A09B; border-top:1px solid #292524;">
        <p style="margin:0;">© ${new Date().getFullYear()} leetpulse. All rights reserved.</p>
      </div>
    </div>
  </div>
  `
    );

    return NextResponse.json(
      { message: "Verification email sent!" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
