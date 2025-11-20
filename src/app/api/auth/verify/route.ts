import connectDB from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import getUserModel from "@/models/Users";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 400 });
  }

  try {
    const User = getUserModel();
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    await connectDB();
    await User.findByIdAndUpdate(decoded.id, { isVerified: true });

    return NextResponse.redirect(new URL("/login?verified=success", req.url));
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }
}
