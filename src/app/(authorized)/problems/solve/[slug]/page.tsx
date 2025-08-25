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
  const [globalProblems, setglobalProblems] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`/api/problem/get/${slug}`),
          fetch(`/api/problem/get/statement/${slug}`), // or whatever your second API is
        ]);

        const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

        if (!res1.ok) toast.error(data1.error || "Error in problem fetch");
        if (!res2.ok) toast.error(data2.error || "Error in meta fetch");

        setProblem(data1.problem || []);
        setglobalProblems(data2.problemStatement || []);
      } catch (err) {
        toast.error("Something went wrong");
      }
    }
    getData();
  }, [slug]);

  return (
    <div className="flex flex-col gap-4 p-4 m-4 md:flex-row">
      <QuestionInfo problem={problem} globalProblems={globalProblems} />
      <CodeEditor problem={problem} />
    </div>
  );
}
