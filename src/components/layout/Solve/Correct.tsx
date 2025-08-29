import KeyValueDisplay from "@/components/ui/KeyValueDisplay";
export default function Correct() {
  return (
    <>
      <KeyValueDisplay
        title="✅ Your solution is"
        value="Correct"
        valueColor="text-success"
        className="text-success font-bold"
      />
      <KeyValueDisplay
        title="🔍 Insights"
        value="Your regex fails when input has repeating characters"
      />

      <div className="bg-bg2 flex flex-col gap-2 p-2 rounded-md ">
        <div className="text-sm text-text_muted">Complexity comparison</div>
        <div className="flex flex-row gap-6">
          <div className="bg-bg2 flex flex-col gap-2 border border-accent px-4 py-2 rounded-md">
            <div className="text-sm text-accent">Your solution</div>
            <div>
              <span className="text-sm">Time: &nbsp;</span>
              <span className="text-base font-semibold">O(n!)</span>
            </div>
            <div>
              <span className="text-sm">Space: &nbsp;</span>
              <span className="text-base font-semibold">O(n)</span>
            </div>
          </div>
          <div className="bg-bg2 flex flex-col gap-2 border border-accent px-4 py-2 rounded-md">
            <div className="text-sm text-accent">Best possible solution</div>
            <div>
              <span className="text-sm">Time: &nbsp;</span>
              <span className="text-base font-semibold">O(n)</span>
            </div>
            <div>
              <span className="text-sm">Space: &nbsp;</span>
              <span className="text-base font-semibold">O(1)</span>
            </div>
          </div>
        </div>
      </div>

      <KeyValueDisplay
        title="💡 Optimizations: "
        value="You solved with hash map. Could also work with two pointers"
      />
      <KeyValueDisplay
        title="📅 Review this problem again on"
        value="31 Aug 2025"
      />
      <KeyValueDisplay
        title="🔗 Next challenge:"
        value="100. Solve Binary Tree      add?"
      />
    </>
  );
}
