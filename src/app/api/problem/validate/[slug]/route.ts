import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "@/lib/auth";
import { runPrompt } from "@/lib/aiClient";
import { Type } from "@google/genai";
import connectDB from "@/lib/db";
import Problem from "@/models/Problems";
import NextPulse from "@/lib/nextPulse";
import mongoose from "mongoose";
import { getUserModel } from "@/models/Users";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  // ------------------------------
  // 1. Authenticate User
  // ------------------------------
  const user = await getUserFromCookies();
  if (!user) {
    return NextResponse.json(
      { error: "User not authorized." },
      { status: 401 }
    );
  }

  // ------------------------------
  // 2. Parse Request Body & Params
  // ------------------------------
  const body = await req.json();
  const code = body.code; // user's submitted code
  const { slug } = await context.params;

  await connectDB(); // connect to MongoDB

  // ------------------------------
  // 3. Fetch Problem Data
  // ------------------------------
  const problemData = await Problem.findOne({
    userId: new mongoose.Types.ObjectId(user.id),
    slug: slug,
  });
  if (!problemData) {
    return NextResponse.json(
      {
        error:
          "Problem is not available in the system. Please add the problem first.",
      },
      { status: 404 }
    );
  }

  if (user.id != process.env.TESTER_MONGODBID) {
    const now = new Date();
    const due = new Date(problemData.dueDate);

    const isDueToday =
      due.getDate() === now.getDate() &&
      due.getMonth() === now.getMonth() &&
      due.getFullYear() === now.getFullYear();

    const formattedDate = new Date(problemData.dueDate).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

    if (!isDueToday) {
      return NextResponse.json(
        {
          error: `Please solve the question on due date i.e ${formattedDate}.`,
        },
        { status: 403 }
      );
    }
  }

  // ------------------------------
  // 4. Define AI Result Schema
  // ------------------------------
  const resultSchema = {
    type: Type.OBJECT,
    properties: {
      verdict: { type: Type.STRING },
      insights: { type: Type.STRING },
      usersComplexity: {
        type: Type.OBJECT,
        properties: {
          time: { type: Type.STRING },
          space: { type: Type.STRING },
        },
      },
      bestComplexity: {
        type: Type.OBJECT,
        properties: {
          time: { type: Type.STRING },
          space: { type: Type.STRING },
        },
      },
      optimizations: { type: Type.STRING },
      failureReasons: { type: Type.STRING },
      correctionHints: { type: Type.STRING },
      correctCode: { type: Type.STRING },
      accuracy: { type: Type.NUMBER },
      recommendedProblems: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    propertyOrdering: [
      "verdict",
      "insights",
      "usersComplexity",
      "bestComplexity",
      "optimizations",
      "failureReasons",
      "correctionHints",
      "correctCode",
      "recommendedProblems",
      "accuracy",
    ],
  };

  // ------------------------------
  // 5. Call AI for Code Analysis
  // ------------------------------

  let aiResult;
  try {
    aiResult = await runPrompt(
      `You are an expert code reviewer. Analyze the following solution (detect language automatically) for question ${slug}:

  ${code}

  Instructions:
  1. Only focus on the code inside the function. Ignore function names, arguments, and return types.
  2. Provide a strict JSON output matching this schema:
     - verdict: "Correct" or "Incorrect"
     - If verdict is "Correct":
       - insights: max ~20 words, concise observations about the solution
       - usersComplexity: use exact Big-O notation, e.g., "O(n)"
       - bestComplexity: use exact Big-O notation, e.g., "O(log n)"
       - optimizations: max ~20 words
     - If verdict is "Incorrect":
       - failureReasons: max ~20 words
       - correctionHints: max ~20 words
       - correctCode: provide only the fixed function code, well-formatted
     - accuracy: number
     - recommendedProblems: array of slugs

  Output must be strictly JSON and no extra explanations. Do not add text outside JSON.`,
      resultSchema
    );
  } catch (err) {
    return NextResponse.json(
      { error: "AI service unavailable. Please try again later." },
      { status: 503 }
    );
  }

  if (!aiResult) {
    return NextResponse.json(
      { error: "AI service did not return a result. Try again." },
      { status: 500 }
    );
  }

  // ------------------------------
  // 6. Fetch User Data
  // ------------------------------
  const User = getUserModel();
  const usersData = await User.findById(user.id);
  if (!usersData) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // ------------------------------
  // 7. Update Problem & User Stats
  // ------------------------------
  problemData.iteration += 1;

  if (aiResult.verdict === "Correct") {
    problemData.correct += 1;
    usersData.xp += 5; // XP for correct answer
  } else {
    if (usersData.xp > 0) usersData.xp -= 2; // XP penalty for wrong answer
  }

  const accuracy = (problemData.correct / problemData.iteration) * 100;

  // ------------------------------
  // 8. Calculate Next Review Interval via NextPulse
  // ------------------------------
  const NextPulseArgs = {
    iteration: problemData.iteration,
    verdict: aiResult.verdict,
    accuracy,
    level: usersData.level || 2, // use current level or default
  };

  const { phase, interval, isMastered } = NextPulse(NextPulseArgs);

  const newDueDate = new Date(problemData.dueDate);
  newDueDate.setDate(newDueDate.getDate() + interval);
  problemData.dueDate = newDueDate;
  problemData.phase = phase;

  await problemData.save();

  // ------------------------------
  // 9. Prepare Response Data
  // ------------------------------
  const returnData = {
    verdict: aiResult.verdict,
    insights: aiResult.insights || null,
    usersComplexity: {
      time: aiResult.usersComplexity?.time ?? null,
      space: aiResult.usersComplexity?.space ?? null,
    },
    bestComplexity: {
      time: aiResult.bestComplexity?.time ?? null,
      space: aiResult.bestComplexity?.space ?? null,
    },
    optimizations: aiResult.optimizations || null,
    failureReasons: aiResult.failureReasons || null,
    correctionHints: aiResult.correctionHints || null,
    correctCode: aiResult.correctCode || null,
    dueDate: newDueDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };

  // ------------------------------
  // 10. Handle Mastery
  // ------------------------------
  if (isMastered) {
    await Problem.deleteOne({
      userId: new mongoose.Types.ObjectId(user.id),
      slug: slug,
    });
    usersData.masteryCount += 1;
    usersData.xp += 10; // bonus XP for mastering problem

    await usersData.save(); // save user XP & mastery count

    return NextResponse.json(
      { mastered: true, analysis: returnData },
      { status: 200 }
    );
  }

  // ------------------------------
  // 11. Save User Data & Return
  // ------------------------------
  await usersData.save(); // save updated XP

  return NextResponse.json({ analysis: returnData }, { status: 200 });
}
