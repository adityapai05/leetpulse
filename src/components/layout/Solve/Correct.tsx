import KeyValueDisplay from "@/components/layout/Solve/KeyValueDisplay";

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
  dueDate: string;
};

type Props = {
  analysis: analysisData;
};

export default function Correct(props: Props) {
  const analysis = props.analysis;
  return (
    <>
      <KeyValueDisplay
        title="Your solution is:"
        value="Correct"
        className="font-bold text-success text-2xl"
      />
      <div className="flex flex-row gap-4 rounded-xl">
        <KeyValueDisplay
          title="Your solutions complexity"
          value={`Time: ${analysis.usersComplexity.time}\nSpace: ${analysis.usersComplexity.space}`}
          className="text-text_primary text-lg"
        />
        <KeyValueDisplay
          title="Best possible solution's complexity:"
          value={`Time: ${analysis.bestComplexity.time}\nSpace: ${analysis.bestComplexity.space}`}
          className="text-text_primary text-lg"
        />
      </div>
      <KeyValueDisplay
        title="Optimizations:"
        value={analysis.optimizations}
        className="text-text_primary"
      />

      <KeyValueDisplay
        title="Insights:"
        value={analysis.insights}
        className="text-text_primary"
      />

      <KeyValueDisplay
        title="Review this problem again on:"
        value={analysis.dueDate}
        className="text-text_primary"
      />
    </>
  );
}
