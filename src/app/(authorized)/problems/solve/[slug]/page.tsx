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
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default function SolvePage({ params }: Props) {
  const { slug } = use(params);

  const [problem, setProblem] = useState<any>(null);
  const [globalProblems, setglobalProblems] = useState<any>(null);
  const [analysis, setAnalysis] = useState<analysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const [res1, res2] = await Promise.all([
          fetch(`/api/problem/get/${slug}`),
          fetch(`/api/problem/get/statement/${slug}`),
        ]);

        const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

        if (!res1.ok) toast.error(data1.error || "Error in problem fetch");
        if (!res2.ok) toast.error(data2.error || "Error in meta fetch");

        setProblem(data1.problem || {});
        setglobalProblems(data2.problemStatement || {});
      } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [slug]);

  if (loading || !problem || !globalProblems) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-xl text-center animate-pulse text-text_primary">
          Loading problem...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-4 m-4 md:flex-row">
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
