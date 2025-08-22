"use client";
import Editor from "@monaco-editor/react";
import Button from "@/components/ui/Button";

async function handleSubmit() {}

export default function Solve() {
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

  return (
    <div className="flex flex-row gap-4 p-4 m-4">
      <div className="bg-bg2 flex flex-1 flex-col gap-4 p-4 border border-accent rounded-md">
        {/* Question */}
        <div className="flex flex-row text-2xl font-semibold">
          <span className="text-text_primary">28. </span>
          <span className="text-text_primary">
            Find the index of first occurrence
          </span>
        </div>
        <div className="flex flex-row">
          <span className="text-text_muted">Due date:&nbsp;</span>
          <span className="text-text_primary">28 July 2025</span>
        </div>
        <div className="flex flex-row">
          <span className="text-text_muted">Iteration:&nbsp;</span>
          <span className="text-text_primary">0</span>
        </div>
        <div className="flex flex-col">
          <span className="text-text_muted">Problem Statement</span>
          <span className="text-text_primary">
            Given an array of integers nums and an integer target, return
            indices of the two numbers such that they add up to target. You may
            assume that each input would have exactly one solution, and you may
            not use the same element twice. You can return the answer in any
            order.
          </span>
        </div>
      </div>

      {/* IDE */}
      <div className="flex flex-col flex-1 border border-accent rounded-md p-4 bg-bg2">
        <div className="bg-bg1 text-sm font-bold text-accent px-4 py-1 rounded-t-md">
          {"</Code>"}
        </div>
        <Editor
          height="100%"
          width="100%"
          defaultLanguage="javascript"
          defaultValue="// Write your code here"
          onMount={handleEditorMount}
          theme="customTheme"
        />
        <div className="bg-bg1 flex flex-row px-4 py-2 justify-end rounded-b-md">
          <Button
            variant="primary"
            text="Submit"
            onClickFunction={handleSubmit}
            type="submit"
          />
        </div>
      </div>
    </div>
  );
}
