import Leaderboard from "@/models/Leaderboard";
import { getUserModel } from "@/models/Users";

import { getUserFromCookies } from "@/lib/auth";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Problems from "@/models/Problems";
import mongoose from "mongoose";

export async function GET() {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized user, please login first" },
      { status: 401 }
    );
  }

  await connectDB();

  const User = getUserModel();
  const UsersData = await User.findById(user.id);

  if (!UsersData) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const UserInLeaderboard = await Leaderboard.findOne({
    username: UsersData.username,
  });

  const problemsInQueue = await Problems.find({
    userId: new mongoose.Types.ObjectId(user.id),
  });

  let dueTodayCount = 0;
  let dueThisWeekCount = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endToday = new Date(today);
  endToday.setHours(23, 59, 59, 999);

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + 7);

  let correct = 0;
  let iteration = 0;

  for (const p of problemsInQueue) {
    correct += p.correct;
    iteration += p.iteration;
    if (p.dueDate >= today && p.dueDate < endToday) {
      dueTodayCount++;
    }
    if (p.dueDate >= endToday && p.dueDate < endOfWeek) {
      dueThisWeekCount++;
    }
  }
  const accuracy = Number(((correct / iteration) * 100).toFixed(2));

  const createdAt = UsersData.createdAt;
  const date = new Date(createdAt);
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const totalUsers = await User.estimatedDocumentCount();

  const response = {
    leftContainer: {
      name: UsersData.firstName,
      username: UsersData.username,
      xp: UsersData.xp,
      rank: UserInLeaderboard?.rank ?? totalUsers ?? 0,
      level: UsersData?.level || 1,
      dateJoined: formatted,
    },
    stats: {
      card1: [
        { title: "Total problems added", value: UsersData.problemsAdded },
        { title: "Currently in review queue", value: problemsInQueue.length },
        { title: "Submissions", value: iteration },
        { title: "Accuracy", value: String((accuracy || 0) + "%") },
        { title: "Problems Mastered", value: UsersData.masteryCount },
      ],
      card2: [
        { title: "Problems due today", value: dueTodayCount },
        { title: "Problems due this week", value: dueThisWeekCount },
      ],
      card3: [
        { title: "Current streak", value: UsersData.streak },
        { title: "Max streak", value: UsersData.maxStreak },
      ],
    },
    performancePie: [
      { name: "Correct", value: accuracy || -1 },
      { name: "Incorrect", value: 100 - accuracy || 0 },
    ],
  };

  return NextResponse.json(response, { status: 200 });
}
