import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "@/lib/auth";
import { runPrompt } from "@/lib/aiClient";
import { Type } from "@google/genai";
import connectDB from "@/lib/db";
import Problems from "@/models/Problems";
import NextPulse from "@/lib/nextPulse";
import mongoose from "mongoose";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json(
      { error: "User not authorized." },
      { status: 401 }
    );
  }

  const body = await req.json();
  const code = body.code;
  const { slug } = await context.params;

  console.log(user, slug);

  await connectDB();

  const problemData = await Problems.findOne({
    userId: new mongoose.Types.ObjectId(user.id),
    slug: slug,
  });

  if (!problemData) {
    return NextResponse.json(
      {
        error:
          "Problem is not available in the system. Please add the problems first.",
      },
      { status: 404 }
    );
  }

  const resultSchema = {
    type: Type.OBJECT,
    properties: {
      verdict: { type: Type.STRING },

      //if code is correct
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

      //If code fails
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

  const aiResult = await runPrompt(
    `The following is code (detect language by yourself) solution for question ${slug}: ${code}.
    return the following data:
    verdict: 'Correct' or 'Incorrect',

    if verdict is 'Correct' then
    insights:Give a very short explanation of how the user's approach works.
    usersComplexity: State the time and space complexity of the user's code.  
    optimalComplexity: Give the best possible time and space complexity for this problem.  
    optimizations: Suggest improvements to make the solution better(keep the sentence very short).

    if verdict is 'Incorrect' then
    failureReason: A short (1-2 sentence , ~15 words) explaination on why the code fails (logic error, edge case, complexity issue, etc.).  
    correctionHints: Suggest what the user should change to fix their approach(short sentences).  
    correctCode: Provide a corrected version of the code only if verdict is 'Incorrect'.

    regardless of verdict return this anyways
    accuracy: rate the correctness of code out of 100. 
    recommendedProblems: Suggest 1 similar LeetCode problem number.`,
    resultSchema
  );

  if (!aiResult) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const NextPulseArgs = {
    iteration: problemData.iteration,
    verdict: aiResult.verdict,
    accuracy: 100,
    memoryScore: 100,
  };

  const interval = NextPulse(NextPulseArgs);

  problemData.iteration += 1;
  problemData.retention = (problemData.retention + aiResult.accuracy) / 2;
  const newDate = new Date(problemData.dueDate);
  newDate.setDate(newDate.getDate() + interval);
  problemData.dueDate = newDate;

  await problemData.save();

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
    dueDate: newDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    recommendedProblems: aiResult.recommendedProblems,
  };

  console.log(returnData);

  return NextResponse.json({ analysis: returnData }, { status: 200 });
}
