import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Problems from "@/models/Problems";

export async function GET(req: NextRequest) {
  try {
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
      user = jwt.verify(userToken, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: "Unauthorized Request" },
        { status: 401 }
      );
    }

    //Connect Database
    await connectDB();

    const problems = await Problems.find({ userId: user.id }).sort({
      dueDate: 1,
    });
    return NextResponse.json({ problems }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
