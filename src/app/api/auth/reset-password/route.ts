import getUserModel from "@/models/Users";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface ITokenPayload extends JwtPayload {
  sub: string;
  purpose: string;
  iat: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { token, password } = body;
    const strongPassword =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:"\\|,.<>/?]).{8,}$/;

    if (!strongPassword.test(password)) {
      return NextResponse.json(
        {
          error:
            "Weak password. Include atleast 1 uppercase, 1 number, 1 special.",
        },
        { status: 400 }
      );
    }

    let decoded: ITokenPayload;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as ITokenPayload;
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const User = getUserModel();
    const user = await User.findById(decoded.sub);

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      {
        message: "Password updated! Login with with your new password",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
