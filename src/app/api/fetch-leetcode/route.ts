// app/api/fetch-leetcode/route.ts
import { NextResponse } from "next/server";
import fetchLeetcodeQuestions from "../../../../scripts/fetchLeetcode";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await fetchLeetcodeQuestions();
    return NextResponse.json({ message: "LeetCode fetch complete" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}
