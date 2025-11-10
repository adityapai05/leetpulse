import { use } from "react";
import CodeBlock from "@/components/ui/CodeBlock";

export default function Analyze({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <div className="flex flex-col gap-2 p-4 m-4 md:flex-row">
      <Analysis />
      <UserCode />
    </div>
  );
}

function Analysis() {
  return (
    <div className="bg-bg1 flex flex-1 flex-col border-2 border-border rounded-t-lg rounded-b-md">
      <div className="bg-bg2 py-2 px-6 font-thin rounded-t-md text-sm">
        Submission
      </div>

      <div className="flex flex-col m-4">
        <h2 className="text-sm text-text_muted">Result</h2>
        <h3>
          Your solution is &nbsp;
          <span className="text-success font-bold">Correct</span>
        </h3>
      </div>
      <div className="flex flex-col m-4">
        <h2 className="text-sm text-text_muted">Insights</h2>
      </div>
    </div>
  );
}

function UserCode() {
  const code = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        numsMap = {}

        for i,num in enumerate(nums):
            if (target-num) in numsMap:
                return [i,numsMap[target-num]]
            numsMap[num] = i`;
  return (
    <div className="bg-bg1 flex flex-1 flex-col border-2 border-border rounded-t-lg rounded-b-md">
      <div className="bg-bg2 py-2 px-6 text-sm text-primary rounded-t-md">
        {"</> Your submitted code"}
      </div>
      <div className="p-4">
        <CodeBlock code={code} />
      </div>
    </div>
  );
}
