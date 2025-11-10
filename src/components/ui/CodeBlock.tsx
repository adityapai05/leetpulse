"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  code: string;
};

export default function CodeBlock(props: Props) {
  const { code } = props;
  const language = localStorage.getItem("preferredLanguage");

  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      showLineNumbers
      wrapLongLines={true}
      customStyle={{ whiteSpace: "pre-wrap" }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
