"use client";

import QuestionInfo from "@/components/layout/Solve/QuestionInfo";
import CodeEditor from "@/components/layout/Solve/CodeEditor";
import Analysis from "@/components/layout/Solve/Analysis";
import toast from "react-hot-toast";
import { use, useEffect, useState } from "react";

type analysisData = {
  verdict: string;
  insights?: string;
  usersComplexity?: {
    time: string;
    space: string;
  };
  bestComplexity?: {
    time: string;
    space: string;
  };
  optimizations?: string;
  failureReasons?: string;
  correctionHints?: string;
  correctCode?: string;
  dueDate: string;
  recommendedProblems: string;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default function SolvePage({ params }: Props) {
  const { slug } = use(params);

  const [problem, setProblem] = useState({});
  const [globalProblems, setglobalProblems] = useState({});
  const [analysis, setAnalysis] = useState<analysisData | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`/api/problem/get/${slug}`),
          fetch(`/api/problem/get/statement/${slug}`),
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
      {analysis ? (
        <Analysis analysis={analysis} />
      ) : (
        <QuestionInfo problem={problem} globalProblems={globalProblems} />
      )}

      <CodeEditor
        problem={problem}
        onAnalysis={setAnalysis}
        globalProblems={globalProblems}
      />
    </div>
  );
}
