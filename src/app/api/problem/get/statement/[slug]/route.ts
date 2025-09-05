import { Type } from "@google/genai";
import connectDB from "@/lib/db";
import { runPrompt } from "@/lib/aiClient";

import GlobalProblems from "@/models/GlobalProblems";

import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "@/lib/auth";
import { getQuestions } from "@/lib/questionsCache";

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
    let problemNumber = slug;

    //Check if problem statements exist in DB
    const problemStatement = await GlobalProblems.findOne({
      problemNumber,
    });

    if (problemStatement) {
      return NextResponse.json(
        { problemStatement: problemStatement },
        { status: 200 }
      );
    } else {
      const questions = getQuestions();
      const problemName = questions[problemNumber]?.title;

      const schema = {
        type: Type.OBJECT,
        properties: {
          problemStatement: { type: Type.STRING },
          input: { type: Type.STRING },
          output: { type: Type.STRING },
        },
        propertyOrdering: ["problemStatement", "input", "output"],
      };

      const aiResult = await runPrompt(
        `for LeetCode problem ${problemNumber} titled ${problemName}, generate:
        - problemStatement:A simple statement about the LeetCode problem.  
        - input: an example input of test case.  
        - output: an example output of test case`,
        schema
      );

      const newProblem = await GlobalProblems.create({
        problemNumber,
        problemStatement: aiResult.problemStatement,
        input: aiResult.input,
        output: aiResult.output,
      });

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
