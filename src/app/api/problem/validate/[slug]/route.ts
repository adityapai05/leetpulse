import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "@/lib/auth";
import { runPrompt } from "@/lib/aiClient";
import { Type } from "@google/genai";
import connectDB from "@/lib/db";
import Problems from "@/models/Problems";
import NextPulse from "@/lib/nextPulse";
import mongoose from "mongoose";
import Users from "@/models/Users";

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
  const problemData = await Problems.findOne({
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
  const aiResult = await runPrompt(
    `The following is a code solution (detect language automatically) for question ${slug}: 

${code}

Please analyze the user's code. Ignore function names, arguments, and return types—they are generic. Focus only on the code inside the function. Do not nitpick.

Provide the following structured output:
1. verdict: 'Correct' or 'Incorrect'.
2. If verdict is 'Correct', include insights, usersComplexity, optimalComplexity, optimizations.
3. If verdict is 'Incorrect', include failureReasons, correctionHints, correctCode.
4. Regardless of verdict, include accuracy and recommendedProblems.
Ensure correctCode is well-formatted.`,
    resultSchema
  );

  if (!aiResult) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  // ------------------------------
  // 6. Fetch User Data
  // ------------------------------
  const usersData = await Users.findById(user.id);
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
    await Problems.deleteOne({
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
