import { useState } from "react";
import Editor from "@monaco-editor/react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function CodeEditor({ problem, onAnalysis }: any) {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("// Write your code here");

  function handleEditorMount(editor, monaco) {
    monaco.editor.defineTheme("customTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1C1917",
      },
    });

    monaco.editor.setTheme("customTheme");
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
        return;
      }

      onAnalysis(data.analysis);
    } catch (err) {
      toast.error(err || "Please try again");
    }
  }
  return (
    <div className="flex flex-col flex-1 border border-accent rounded-md p-4 bg-bg2 shadow-md">
      <div className="flex flex-row justify-between bg-stone-900 text-sm font-bold text-accent px-4 py-2 rounded-t-md">
        {"</Code>"}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-stone-900 rounded px-2 font-medium text-white"
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
      <div className="bg-stone-900 flex flex-row p-4 justify-end rounded-b-md gap-4">
        <Button
          variant="secondary"
          text={`LC ${problem.problemNo}`}
          onClickFunction={handleRedirect}
          type=""
        />
        <Button
          variant="primary"
          text="Submit"
          onClickFunction={handleSubmit}
          type="submit"
        />
      </div>
    </div>
  );
}
