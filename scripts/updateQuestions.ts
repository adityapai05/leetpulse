import fs from "fs";
import path from "path";
import fetchLeetcodeQuestions from "./fetchLeetcode";

async function main() {
  console.log("Fetching questions from LeetCode...");
  const questions = await fetchLeetcodeQuestions();

  const filePath = path.join(process.cwd(), "public", "questions.json");
  fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), "utf-8");

  console.log(
    `Saved ${Object.keys(questions).length} questions to public/questions.json`
  );
}

main().catch((err) => {
  console.error(
    "Failed to update questions:",
    err instanceof Error ? err.message : err
  );
  process.exit(1);
});