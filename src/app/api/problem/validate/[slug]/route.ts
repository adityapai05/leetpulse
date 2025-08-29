import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "@/lib/auth";
import { runPrompt } from "@/lib/aiClient";
import { Type } from "@google/genai";
import connectDB from "@/lib/db";
import Problems from "@/models/Problems";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json(
      { error: "User not authorized." },
      { status: 404 }
    );
  }

  const body = await req.json();
  const code = body.code;
  const { slug } = await context.params;

  const resultSchema = {
    type: Type.OBJECT,
    properties: {
      verdict: { type: Type.STRING },

      //if code is correct
      insigts: { type: Type.STRING },
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

      recommendedProblems: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    propertyOrdering: [
      "verdict",
      "insigts",
      "usersComplexity",
      "bestComplexity",
      "optimizations",
      "failureReasons",
      "correctionHints",
      "correctCode",
      "recommendedProblems",
    ],
  };

  const aiResult = await runPrompt(
    `The following is code (detect language by yourself) solution for question ${slug}: ${code}.
    return the following data:
    verdict: 'Correct' or 'Incorrect',

    if verdict is 'Correct' then
    insigts:Give a very short explanation of how the user's approach works.
    userComplexity: State the time and space complexity of the user's code.  
    optimalComplexity: Give the best possible time and space complexity for this problem.  
    optimizations: Suggest improvements to make the solution better(keep the sentence very short).

    if verdict is 'Incorrect' then
    failureReason: A short (1-2 sentence , ~15 words) explaination on why the code fails (logic error, edge case, complexity issue, etc.).  
    correctionHints: Suggest what the user should change to fix their approach(short sentences).  
    correctCode: Provide a corrected version of the code only if verdict is 'Incorrect'.

    regardless of verdict return this anyways
    recommendedProblems: Suggest 1 similar LeetCode problem number.`,
    resultSchema
  );

  return NextResponse.json({ aiResult: aiResult }, { status: 200 });
}
