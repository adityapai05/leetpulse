import { getUserFromCookies } from "@/lib/auth";
import Problem from "@/models/Problems";
import getUserModel from "@/models/Users";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE() {
  const user = await getUserFromCookies();
  if (!user) {
    return new Response("Unauthorized, please login", { status: 401 });
  }
  try {
    await connectDB();

    await Problem.deleteMany({ userId: user.id });
    const User = getUserModel();
    await User.findByIdAndUpdate(user.id, {
      xp: 0,
      level: 1,
      problemsAdded: 0,
      masteryCount: 0,
      streak: 0,
      maxStreak: 0,
    });
    return NextResponse.json(
      { message: "All progress deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
