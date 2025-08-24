import connectDB from "@/lib/db";
import GlobalProblems from "@/models/GlobalProblems";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

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

    //Check if problem statements exist in DB
    const problemStatement = await GlobalProblems.findOne({
      problemNumber: slug,
    });

    if (problemStatement) {
      return NextResponse.json(problemStatement, { status: 200 });
    } else {
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
