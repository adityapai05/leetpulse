// /api/user/summary/route.ts
import { getUserModel } from "@/models/Users";
import { getUserFromCookies } from "@/lib/auth";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUserFromCookies();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const User = getUserModel();
    const UsersData = await User.findById(user.id).select(
      " username firstName xp streak"
    );

    if (!UsersData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        username: UsersData.username,
        firstName: UsersData.firstName,
        xp: UsersData.xp,
        streak: UsersData.streak,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching user summary:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
