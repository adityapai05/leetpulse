"use client";

import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  code: string;
};

export default function CodeBlock({ code }: Props) {
  const [language, setLanguage] = useState<string>("cpp"); // default

  useEffect(() => {
    const pref = localStorage.getItem("preferredLanguage");
    if (pref) setLanguage(pref);
  }, []);

  return (
    <div className="">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        wrapLongLines={true}
        customStyle={{ whiteSpace: "pre-wrap" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
