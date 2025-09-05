// /api/user/summary/route.ts
import Users from "@/models/Users";
import { getUserFromCookies } from "@/lib/auth";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const UsersData = await Users.findById(user.id).select("firstName xp streak");

  if (!UsersData) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      firstName: UsersData.firstName,
      xp: UsersData.xp,
      streak: UsersData.streak,
    },
    { status: 200 }
  );
}
