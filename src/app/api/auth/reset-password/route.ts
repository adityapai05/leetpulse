import connectDB from "@/lib/db";
import getUserModel from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { tokenMatchesPassword, verifyResetToken } from "@/lib/resetToken";

const strongPassword =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:"\\|,.<>/?]).{8,}$/;

const INVALID_LINK =
  "This reset link is invalid or has expired. Please request a new one.";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = body;

    if (typeof password !== "string" || !strongPassword.test(password)) {
      return NextResponse.json(
        {
          error:
            "Weak password. Include atleast 1 uppercase, 1 number, 1 special.",
        },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }

    // Wrong purpose, expired or tampered links are refused.
    const verified = verifyResetToken(token, process.env.JWT_SECRET);
    if (!verified.ok) {
      return NextResponse.json({ error: INVALID_LINK }, { status: 400 });
    }

    // Always connect first: on a freshly started server nothing else has.
    await connectDB();

    const User = getUserModel();
    const user = await User.findById(verified.userId);

    // A link that was already used no longer matches the stored password.
    if (!user || !tokenMatchesPassword(verified.fingerprint, user.password)) {
      return NextResponse.json({ error: INVALID_LINK }, { status: 400 });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    return NextResponse.json(
      { message: "Password updated! Login with your new password" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
