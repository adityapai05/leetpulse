import KeyValueDisplay from "@/components/layout/Solve/KeyValueDisplay";
import CodeBlock from "@/components/ui/CodeBlock";

type analysisData = {
  verdict: string;
  failureReasons?: string;
  correctionHints?: string;
  correctCode?: string;
  dueDate: string;
};

type Props = {
  analysis: analysisData;
};

export default function Incorrect(props: Props) {
  const analysis = props.analysis;
  const language = localStorage.getItem("preferredLanguage");

  return (
    <>
      <KeyValueDisplay
        title="Your solution is:"
        value="Incorrect"
        className="font-bold text-error text-2xl"
      />
      <KeyValueDisplay
        title="Failure reason:"
        value={analysis.failureReasons}
        className="text-text_primary"
      />
      <KeyValueDisplay
        title="Correction hints:"
        value={analysis.correctionHints}
        className="text-text_primary"
      />
      <div className="border-2 border-bg2 p-2 flex flex-row gap-4 rounded-xl">
        <div className="bg-bg2 flex flex-col items-baseline py-2 px-4 rounded-lg w-full shadow-md">
          <div className="text-accent text-base">Corrected Code</div>
          <CodeBlock code={analysis.correctCode} language={language} />
        </div>
      </div>
      {console.log(analysis.correctCode)}
      <KeyValueDisplay
        title="Review this problem again on:"
        value={analysis.dueDate}
        className="text-text_primary"
      />
    </>
  );
}
