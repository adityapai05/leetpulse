export type QuestionMap = Record<string, { title: string; slug: string }>;

export default async function fetchLeetcodeQuestions(): Promise<QuestionMap> {
  const res = await fetch("https://leetcode.com/api/problems/all/");
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

  const data = await res.json();
  const questions: QuestionMap = {};

  for (const q of data.stat_status_pairs) {
    questions[q.stat.frontend_question_id] = {
      title: q.stat.question__title,
      slug: q.stat.question__title_slug,
    };
  }

  return questions;
}