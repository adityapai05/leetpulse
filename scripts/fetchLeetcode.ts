import fs from "fs";
import path from "path";

export default async function fetchLeetcodeQuestions() {
  const res = await fetch("https://leetcode.com/api/problems/all/");
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

  const data = await res.json();
  const questions = {};

  for (const q of data.stat_status_pairs) {
    questions[q.stat.frontend_question_id] = {
      title: q.stat.question__title,
      slug: q.stat.question__title_slug,
    };
  }

  return questions;
}

async function main() {
  console.log("Fetching questions from Leetcode...");
  const questions = await fetchLeetcodeQuestions();

  const filePath = path.join(process.cwd(), "public", "questions.json");
  fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), "utf-8");

  console.log(
    `Saved ${Object.keys(questions).length} questions to questions.json`
  );
}

main();
