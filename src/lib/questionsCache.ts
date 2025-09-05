import fs from "fs";
import path from "path";

let questions: Record<string, { title: string; slug: string }> | null = null;

export function getQuestions() {
  if (!questions) {
    const filePath = path.join(process.cwd(), "public", "questions.json");
    questions = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
  return questions;
}
