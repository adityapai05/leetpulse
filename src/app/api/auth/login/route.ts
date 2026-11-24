import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import getUserModel from "@/models/Users";

import { NextRequest, NextResponse } from "next/server";

const GENERIC_ERROR = "Incorrect username or password.";

let dummyHash: string | null = null;

// Compared against when no real password exists, so unknown users and
// Google-only accounts take about as long as a wrong password (FR-1.5, FR-1.8).
async function getDummyHash(): Promise<string> {
  if (!dummyHash) dummyHash = await bcrypt.hash("leetpulse-dummy-password", 10);
  return dummyHash;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { usernameORemail, password } = body;

    if (
      typeof usernameORemail !== "string" ||
      typeof password !== "string" ||
      !usernameORemail.trim() ||
      !password
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const identifier = usernameORemail.trim();
    const User = getUserModel();
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier.toLowerCase() }],
    });

    const hash = user?.password ? user.password : await getDummyHash();
    const passwordMatch = await bcrypt.compare(password, hash);

    if (!user || !user.password || !passwordMatch) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
    }

    // Only someone who knows the password learns the account is unverified.
    if (!user.isVerified) {
      return NextResponse.json(
        {
          error:
            "Please verify your email before logging in. Check your inbox for the verification link.",
        },
        { status: 403 }
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const cookieStore = await cookies();
    cookieStore.set({
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({ message: "Login Successful" });
  } catch {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
