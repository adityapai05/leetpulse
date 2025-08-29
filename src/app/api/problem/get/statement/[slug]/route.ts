import { Type } from "@google/genai";
import connectDB from "@/lib/db";
import { runPrompt } from "@/lib/aiClient";

import GlobalProblems from "@/models/GlobalProblems";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const cookieStore = await cookies();
    const userToken = cookieStore.get("authToken")?.value;
    if (!userToken) {
      return NextResponse.json(
        { error: "Unauthorized Request" },
        { status: 401 }
      );
    }

    let user: any;
    try {
      user = jwt.verify(userToken, process.env.JWT_SECRET!);
    } catch {
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
      const filePath = path.join(process.cwd(), "public", "questions.json");
      const questions = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const problemName = questions[problemNumber]?.title;

      const schema = {
        type: Type.OBJECT,
        properties: {
          problemStatement: { type: Type.STRING },
          arguments: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          returnType: { type: Type.STRING },
        },
        propertyOrdering: ["problemStatement", "arguments", "returnType"],
      };

      const aiResult = await runPrompt(
        `For LeetCode problem ${problemNumber} titled ${problemName}, generate:

        - problemStatement: a clear, easy-to-understand description of what the problem is asking the user to do, in simple language without technical jargon. Avoid words like "implement a function"; just explain the task directly.  
        - arguments: list the inputs with their data types.  
        - returnType: specify the type of the output.`,
        schema
      );

      const newProblem = await GlobalProblems.create({
        problemNumber,
        problemStatement: aiResult.problemStatement,
        arguments: aiResult.arguments,
        returnType: aiResult.returnType,
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
