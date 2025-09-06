import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Leaderboard from "@/models/Leaderboard";
import { getUserModel } from "@/models/Users";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split("Bearer ")[1];

  if (!token || token != process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const User = getUserModel();
    const users = await User.find(
      {},
      { _id: 0, username: 1, xp: 1, averageIteration: 1 }
    ).sort({ xp: -1 });

    await Leaderboard.deleteMany({});

    const bulk = users.map((u, idx) => ({
      rank: idx + 1,
      username: u.username,
      xp: u.xp,
    }));

    await Leaderboard.insertMany(bulk);

    return NextResponse.json(
      { message: "Leaderboard updated", count: bulk.length },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update leaderboard" },
      { status: 500 }
    );
  }
}
