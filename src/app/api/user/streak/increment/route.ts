import { getUserModel } from "@/models/Users";

import { getUserFromCookies } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function GET(req: NextRequest) {
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
    const usersData = await User.findById(user.id);
    if (!usersData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    usersData.streak += 1;
    usersData.maxStreak = Math.max(usersData.maxStreak, usersData.streak);

    await usersData.save(); // <-- save the changes

    return NextResponse.json(
      { message: "Your streak and max streak have been updated" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
