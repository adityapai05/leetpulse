import connectDB from "@/lib/db";
import Problem from "@/models/Problems";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {

    try {
        const cookieStore = await cookies();
        const userToken = cookieStore.get("authToken")?.value;
        if (!userToken) {
            return NextResponse.json({ error: "Unauthorized Request" }, { status: 401 });
        }

        let user;
        try {
            user = jwt.verify(userToken, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json({ error: "Unauthorized Request" }, { status: 401 });
        }

        const userId = user.id; // MongoDB userId
        const body = await req.json();
        const { problemNo, tags, notes, language, solution } = body;
        const filePath = path.join(process.cwd(), "public", "questions.json");
        const questions = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const problemName = questions[problemNo]?.title;
        const slug = questions[problemNo]?.slug;

        //Connect Database
        await connectDB();

        //Check if problem number already exists in DB
        if (await Problem.findOne({ userId, problemNo }))
            return NextResponse.json({ error: "Problem no is already in the review queue" }, { status: 409 });

        //Add problem to database
        await Problem.create({
            userId,
            problemNo,
            problemName,
            slug,
            tags,
            notes,
            language,
            solution
        });

        //Return success message
        return NextResponse.json({ success: "Added to review queue" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
    }
}