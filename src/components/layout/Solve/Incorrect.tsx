import KeyValueDisplay from "@/components/ui/KeyValueDisplay";

type analysisData = {
  verdict: string;
  failureReasons?: string;
  correctionHints?: string;
  correctCode?: string;
  dueDate: string;
  recommendedProblems: string;
};

type Props = {
  analysis: analysisData;
};

export default function Incorrect(props: Props) {
  const analysis = props.analysis;

  return (
    <>
      <KeyValueDisplay
        title="❌ Your solution is"
        value="Incorrect"
        valueColor="text-error"
        className="text-error font-bold text-xl"
      />
      <KeyValueDisplay
        title="⚠️ Reason why your code fails submission"
        value={analysis.failureReasons}
      />
      <KeyValueDisplay
        title="🛠 Ways to correct your solution"
        value={analysis.correctionHints}
      />
      <KeyValueDisplay title=" Corrected Code" value={analysis.correctCode} />

      {/* make a link that takes user to leetcode (also specify that it takes to leetcode) */}
      <KeyValueDisplay
        title="🧩 Recommended similar problems"
        value="100. Solve Binary Tree      add?"
      />
    </>
  );
}
