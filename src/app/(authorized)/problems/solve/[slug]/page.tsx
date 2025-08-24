"use client";

import { use } from "react";
import QuestionInfo from "@/components/layout/Solve/QuestionInfo";
import CodeEditor from "@/components/layout/Solve/CodeEditor";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function SolvePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params); // unwrap the promise

  const [problem, setProblem] = useState([]);
  const [problemStatement, setProblemStatement] = useState([]);

  useEffect(() => {
    async function getProblem() {
      const res = await fetch(`/api/problem/get/${slug}`);
      const data = await res.json();
      if (!res.ok) {
        toast.error(
          data.error || "Something went wrong. Please try again later."
        );
      }
      setProblem(data.problem || []);
      console.log(data.problem);
    }
    getProblem();
  }, [slug]);

  return (
    <div className="flex flex-col gap-4 p-4 m-4 md:flex-row">
      <QuestionInfo problem={problem} />
      <CodeEditor problem={problem} />
    </div>
  );
}
