import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  code: string;
  language: string;
};

export default function CodeBlock(props: Props) {
  const { code, language } = props;
  return (
    <SyntaxHighlighter
      language={language}
      style={okaidia}
      showLineNumbers
      wrapLongLines={true}
      customStyle={{ whiteSpace: "pre-wrap" }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
