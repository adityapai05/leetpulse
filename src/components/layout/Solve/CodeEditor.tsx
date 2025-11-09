import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { getBoilerplate } from "@/utils/boilerplateGenerator";

export default function CodeEditor({
  problem,
  onAnalysis,
  globalProblems,
}: any) {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("// Write your code here");

  useEffect(() => {
    const boilerplate = getBoilerplate(language, problem, globalProblems);
    setCode(boilerplate);
  }, [language, problem]);

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage");
    if (saved) setLanguage(saved);
  }, []);

  // save preference to localStorage
  useEffect(() => {
    localStorage.setItem("preferredLang", language);
  }, [language]);

  function handleEditorMount(editor, monaco) {
    const bg = getComputedStyle(document.documentElement)
      .getPropertyValue("--bg-1")
      .trim();

    monaco.editor.defineTheme("customTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": bg,
      },
    });

    monaco.editor.setTheme("customTheme");
  }

  function handleLanguageChange(lang: string) {
    setLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
  }

  function handleRedirect() {
    window.open(
      `https://leetcode.com/problems/${problem.slug}/description/`,
      "_blank"
    );
  }

  async function handleSubmit() {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code }),
      };

      const res = await fetch(
        `/api/problem/validate/${problem.slug}`,
        requestOptions
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        onAnalysis(null, false);
        return;
      }

      onAnalysis(data.analysis, false);

      if (data.mastered) {
        toast.success(
          data.message ||
            `Congratulations! You have mastered the problem ${problem.problemName}`
        );
      }
    } catch (err) {
      toast.error(err || "Please try again");
    }
  }

  return (
    <div className=" bg-bg1 flex flex-col flex-1 border-2 border-bg2 rounded-md">
      <div className="bg-bg2 flex flex-row justify-between text-base font-bold text-accent px-4 py-2 rounded-t-md mb-4">
        {"</>"}
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="bg-bg2 rounded font-medium text-white text-sm"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          {/* add more supported languages here */}
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
      <div className="bg-bg1 flex flex-row p-4 justify-end rounded-b-md gap-4">
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
