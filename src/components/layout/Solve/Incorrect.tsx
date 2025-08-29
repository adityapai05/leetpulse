import KeyValueDisplay from "@/components/ui/KeyValueDisplay";

export default function Incorrect() {
  return (
    <>
      <KeyValueDisplay
        title="❌ Your solution is"
        value="Incorrect"
        valueColor="text-error"
      />
      <KeyValueDisplay
        title="⚠️ Reason why your code fails submission"
        value="Failing test case (input, their output, expected output)."
      />
      <KeyValueDisplay
        title="🛠 Ways to correct your solution"
        value="Your solution doesn’t handle duplicates"
      />
      <KeyValueDisplay title="📅 Next due date" value="31 Aug 2025" />
      <KeyValueDisplay
        title="🧩 Recommended similar problems"
        value="100. Solve Binary Tree      add?"
      />
    </>
  );
}
