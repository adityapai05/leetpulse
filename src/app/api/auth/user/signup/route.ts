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
      `<p>Hi ${newUser.firstName},</p>
   <p>Click the button below to verify your account:</p>
   <a href="${verificationUrl}" style="display:inline-block;padding:10px 20px;background:#4F46E5;color:white;text-decoration:none;border-radius:6px;">Verify Email</a>
   <p>This link expires in 1 hour.</p>`
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
