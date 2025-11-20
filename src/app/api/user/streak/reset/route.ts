import getUserModel from "@/models/Users";

import { getUserFromCookies } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookies();
  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized request" },
      { status: 401 }
    );
  }
  try {
    await connectDB();

    const User = getUserModel();
    const updatedUser = await User.findByIdAndUpdate(user.id, { streak: 0 });
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Your streak has been set to 0" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
