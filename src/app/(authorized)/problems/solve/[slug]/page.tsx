"use client";

import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Editor from "@monaco-editor/react";
import Skeleton from "@/components/layout/Solve/Skeleton";
import CodeEditorSkeleton from "@/components/layout/Solve/CodeEditorSkeleton";
import Button from "@/components/ui/Button";
import Phases from "@/components/ui/Phases";
import { getBoilerplate } from "@/utils/boilerplateGenerator";
import { useRouter } from "next/navigation";
import { useCodeStore } from "@/lib/stores/CodeStore";

// -------------------- Page Component --------------------

export default function SolvePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [problem, setProblem] = useState<any>(null);
  const [statement, setStatement] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProblemData() {
      setLoading(true);
      try {
        const [res1, res2] = await Promise.all([
          fetch(`/api/problem/get/${slug}`),
          fetch(`/api/problem/get/statement/${slug}`),
        ]);

        const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
        if (!res1.ok) toast.error(data1.error || "Failed to load problem.");
        if (!res2.ok) toast.error(data2.error || "Failed to load statement.");

        setProblem(data1.problem || {});
        setStatement(data2.problemStatement || {});
      } catch {
        toast.error("Something went wrong while fetching problem data.");
      } finally {
        setLoading(false);
      }
    }

    fetchProblemData();
  }, [slug]);

  if (loading || !problem || !statement) {
    return (
      <div className="flex flex-col gap-2 p-4 m-4 md:flex-row h-[75vh]">
        <Skeleton />
        <CodeEditorSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-4 m-4 md:flex-row">
      <ProblemPanel problem={problem} statement={statement} />
      <CodeEditorPanel problem={problem} statement={statement} />
    </div>
  );
}

// -------------------- Problem Info --------------------

function ProblemPanel({
  problem,
  statement,
}: {
  problem: any;
  statement: any;
}) {
  return (
    <div className="bg-bg1 flex flex-1 flex-col border border-border rounded-t-lg rounded-b-md">
      <div className="bg-bg2 py-2 px-6 font-thin rounded-t-md">
        Problem Statement
      </div>

      <div className="flex flex-col gap-8 mx-6 my-4">
        <h2 className="flex flex-row text-xl font-semibold text-text_primary">
          {problem.problemNo}.&nbsp;{problem.problemName}
        </h2>

        <p className="whitespace-pre-line text-text_primary text-base font-mono">
          {statement.problemStatement}
        </p>

        <InfoRow label="Notes:" value={problem.notes || "No notes"} />
        <TagRow tags={problem.tags} />
        <InfoRow label="Iteration:" value={problem.iteration} />
        <InfoRow label="Phase:" value={<Phases variant={problem.phase} />} />

        <InfoRow
          label="Due Date:"
          value={new Date(problem.dueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: "UTC",
          })}
        />
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex flex-row items-center gap-2">
      <span className="text-text_muted text-sm">{label}</span>
      <span className="text-text_primary text-sm">{value}</span>
    </div>
  );
}

function TagRow({ tags }: { tags: string[] }) {
  if (!tags?.length)
    return (
      <InfoRow
        label="Tags:"
        value={<span className="text-text_muted">No tags</span>}
      />
    );
  return (
    <div className="flex flex-row gap-4 items-center">
      <span className="text-text_muted text-sm">Tags:</span>
      {tags.map((tag) => (
        <Phases key={tag} variant={tag} />
      ))}
    </div>
  );
}

// -------------------- Code Editor --------------------

function CodeEditorPanel({ problem, statement }: any) {
  const [language, setLanguage] = useState("cpp");
  const { code, setCode } = useCodeStore();
  const router = useRouter();

  // load preferred language
  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage");
    if (saved) setLanguage(saved);
  }, []);

  // load boilerplate
  useEffect(() => {
    const boilerplate = getBoilerplate(language, problem, statement);
    setCode(boilerplate);
  }, [language, problem, statement]);

  // persist language
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
  }, [language]);

  function handleEditorMount(editor, monaco) {
    const bg = getComputedStyle(document.documentElement)
      .getPropertyValue("--bg-1")
      .trim();

    monaco.editor.defineTheme("customTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: { "editor.background": "#262626" },
    });

    monaco.editor.setTheme("customTheme");
  }

  function handleRedirect() {
    window.open(
      `https://leetcode.com/problems/${problem.slug}/description/`,
      "_blank"
    );
  }

  function handleSubmit() {
    router.push(`/problems/analyze/${problem.slug}`);
  }

  return (
    <div className="bg-[#262626] flex flex-col flex-1 border border-border rounded-t-lg rounded-b-md">
      <div className="bg-[#404040] flex justify-between text-base font-bold text-accent px-4 py-2 mb-4 rounded-t-md">
        {"</>"}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-[#404040] rounded font-medium text-white text-sm"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>

      <Editor
        height="100%"
        width="100%"
        language={language}
        value={code}
        onChange={(value) => setCode(value || "")}
        onMount={handleEditorMount}
        theme="customTheme"
      />

      <div className="bg-[#262626] flex flex-row p-4 justify-end rounded-b-md gap-4">
        <Button
          variant="secondary"
          text={`LeetCode ${problem.problemNo}`}
          onClick={handleRedirect}
        />
        <Button variant="primary" text="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
}
