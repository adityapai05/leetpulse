import { getUserFromCookies } from "@/lib/auth";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Leaderboard from "@/models/Leaderboard";

export async function GET() {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: "User not authorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const top10 = await Leaderboard.find({}).sort({ rank: 1 }).limit(10);
    return NextResponse.json({ leaderboardList: top10 }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
