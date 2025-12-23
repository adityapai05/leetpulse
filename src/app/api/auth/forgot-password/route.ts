import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail";
import connectDB from "@/lib/db";
import getUserModel from "@/models/Users";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const body = await req.json();
  let { emailOrUsername } = body;

  if (typeof emailOrUsername !== "string") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  emailOrUsername = emailOrUsername.trim();

  if (!emailOrUsername) {
    return NextResponse.json({ error: "Please fill data" }, { status: 400 });
  }

  await connectDB();

  const lower = emailOrUsername.toLowerCase();

  const User = getUserModel();
  const user = await User.findOne({
    $or: [{ username: emailOrUsername }, { email: lower }],
    isVerified: true,
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not configured");
  }

  const token = jwt.sign(
    {
      sub: user._id.toString(),
      purpose: "password_reset",
      iat: Math.floor(Date.now() / 1000),
    },
    process.env.JWT_SECRET,
    { expiresIn: "20m" }
  );

  const resetPasswordUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  await sendEmail(
    user.email,
    "Reset your leetpulse password",
    `
  <div style="background:#0C0A09; padding:32px; font-family:Arial, sans-serif; color:#FAFAF9;">
    <div style="max-width:480px; margin:0 auto; background:#1C1917; border:1px solid #292524; border-radius:12px; overflow:hidden;">
      <!-- Header -->
      <div style="padding:24px; text-align:center; border-bottom:1px solid #292524;">
        <h1 style="margin:0; font-size:22px; color:#FAFAF9;">leetpulse</h1>
      </div>

      <!-- Body -->
      <div style="padding:24px;">
        <p style="margin:0 0 24px 0; color:#A6A09B;">
          Hi <strong>${
            user.firstName
          }</strong>! Click the button below to change your account password.
        </p>

        <div style="text-align:center; margin-bottom:24px;">
          <a href="${resetPasswordUrl}"
             style="display:inline-block; padding:12px 24px; background:#F59E0B; color:#121212; font-weight:bold; text-decoration:none; border-radius:8px;">
            Reset Password
          </a>
        </div>

        <p style="margin:0; font-size:14px; color:#A6A09B;">
          ⚠️ This link will expire in <strong>20 mins</strong>.
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
    { message: "Reset password email sent" },
    { status: 200 }
  );
}
