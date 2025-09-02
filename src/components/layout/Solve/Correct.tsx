import KeyValueDisplay from "@/components/ui/KeyValueDisplay";

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
  recommendedProblems: string;
};

type Props = {
  analysis: analysisData;
};

export default function Correct(props: Props) {
  const analysis = props.analysis;
  return (
    <>
      <KeyValueDisplay
        title="✅ Your solution is"
        value="Correct"
        valueColor="text-success"
        className="text-success font-bold text-xl"
      />
      <KeyValueDisplay title="🔍 Insights" value={analysis.insights} />

      <div className="bg-bg2 flex flex-col gap-2 p-2 rounded-md ">
        <div className="text-sm text-warning">Complexity comparison</div>
        <div className="flex flex-row gap-6">
          <div className="bg-bg2 flex flex-col gap-2 border border-text_muted px-4 py-2 rounded-md shadow-md">
            <div className="text-sm text-warning">Your solution</div>
            <div>
              <span className="text-sm">Time: &nbsp;</span>
              <span className="text-base font-semibold">
                {analysis.usersComplexity?.time || "Not Available"}
              </span>
            </div>
            <div>
              <span className="text-sm">Space: &nbsp;</span>
              <span className="text-base font-semibold">
                {analysis.usersComplexity?.space || "Not Available"}
              </span>
            </div>
          </div>
          <div className="bg-bg2 flex flex-col gap-2 border border-text_muted px-4 py-2 rounded-md shadow-md">
            <div className="text-sm text-warning">Best possible solution</div>
            <div>
              <span className="text-sm">Time: &nbsp;</span>
              <span className="text-base font-semibold">
                {analysis.bestComplexity?.time || "Not Available"}
              </span>
            </div>
            <div>
              <span className="text-sm">Space: &nbsp;</span>
              <span className="text-base font-semibold">
                {analysis.bestComplexity?.space || "Not Available"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <KeyValueDisplay
        title="💡 Optimizations: "
        value={analysis.optimizations}
      />
      <KeyValueDisplay
        title="📅 Review this problem again on"
        value={analysis.dueDate}
      />

      {/* make a link that takes user to leetcode (also specify that it takes to leetcode) */}
      <KeyValueDisplay
        title="🔗 Next challenge:"
        value="100. Solve Binary Tree      add?"
      />
    </>
  );
}
