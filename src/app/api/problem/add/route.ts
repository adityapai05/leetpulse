import connectDB from "@/lib/db";
import Problem from "@/models/Problems";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "@/lib/auth";
import { getQuestions } from "@/lib/questionsCache";
import mongoose from "mongoose";
import Users from "@/models/Users";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json(
      { error: "Session expired! Please login again" },
      { status: 401 }
    );
  }

  try {
    const userId = new mongoose.Types.ObjectId(user.id);
    const body = await req.json();
    const { problemNo, tags, notes } = body;
    const questions = getQuestions();
    const problemName = questions[problemNo]?.title;
    const slug = questions[problemNo]?.slug;

    //Connect Database
    await connectDB();

    //Check if problems in the queue is >= 20.
    if ((await Problem.countDocuments({ userId })) >= 20) {
      return NextResponse.json(
        { error: "You can only have 20 questions in the review queue." },
        { status: 409 }
      );
    }

    //Check if problem number already exists in DB
    if (await Problem.findOne({ userId, problemNo }))
      return NextResponse.json(
        { error: "Problem no is already in the review queue" },
        { status: 409 }
      );

    //Add problem to database
    await Problem.create({
      userId,
      problemNo,
      problemName,
      slug,
      tags,
      notes,
    });

    await Users.findByIdAndUpdate(user.id, { $inc: { problemsAdded: 1 } });

    //Return success message
    return NextResponse.json(
      { success: "Added to review queue" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
