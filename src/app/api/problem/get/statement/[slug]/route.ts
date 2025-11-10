import { Type } from "@google/genai";
import connectDB from "@/lib/db";
import { runPrompt } from "@/lib/aiClient";

import GlobalProblems from "@/models/GlobalProblems";

import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const user = await getUserFromCookies();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized Request" },
        { status: 401 }
      );
    }

    //Connect DB
    await connectDB();
    await GlobalProblems.syncIndexes();

    //Check if problem statements exist in DB
    const problemStatement = await GlobalProblems.findOne({
      slug,
    });

    if (problemStatement) {
      return NextResponse.json(
        { problemStatement: problemStatement },
        { status: 200 }
      );
    } else {
      const schema = {
        type: Type.OBJECT,
        properties: {
          problemStatement: { type: Type.STRING },
          inputArguments: { type: Type.STRING },
          outputDataType: { type: Type.STRING },
        },
        propertyOrdering: [
          "problemStatement",
          "inputArguments",
          "outputDataType",
        ],
      };

      console.log("Running prompt ahh");

      const aiResult = await runPrompt(
        `You are helping generate structured metadata for a LeetCode problem identified by slug: "${slug}".
    
        Return results in concise, plain English.
  
        Generate the following fields:
        1. problemStatement — A short, clear summary of the problem (2–4 sentences) followed by one small test case example **on a new line**, like:
        "Example:
        Input: ...
        Output: ..."
        Use line breaks ("\\n") for formatting where needed.
        2. inputArguments — A comma-separated list describing all inputs in the format: "name: type" (e.g., "nums: int[], target: int").
        3. outputDataType — The return data type (e.g., "int", "boolean", "string[]").
  
      Keep everything clean, factual, and formatted for display — no markdown, no bullet points, no code fences.`,
        schema
      );

      console.log("Propmt ran ahh");

      const newProblem = await GlobalProblems.create({
        slug,
        problemStatement: aiResult.problemStatement,
        inputArguments: aiResult.inputArguments,
        outputDataType: aiResult.outputDataType,
      });

      console.log(newProblem);
      console.log("added that shit into DB ahh");

      return NextResponse.json(
        { problemStatement: newProblem },
        { status: 200 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
