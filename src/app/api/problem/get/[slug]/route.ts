import connectDB from "@/lib/db";
import Problem from "@/models/Problems";
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

    await connectDB();

    const problem = await Problem.findOne({ userId: user.id, slug: slug });
    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    return NextResponse.json({ problem }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
