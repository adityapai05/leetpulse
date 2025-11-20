"use client";

import CodeBlock from "@/components/ui/CodeBlock";

export default function Docs() {
  const code = `function twoSum(nums, target) {\n\tconst map = {};\n\tfor (let i = 0; i < nums.length; i++) {\n\t\tconst complement = target - nums[i];\n\t\tif (map[complement] !== undefined) return [map[complement], i];\t
  \tmap[nums[i]] = i;\n\t}\n\treturn [];\n}`;
  return (
    <div className="bg-bg0 p-8 flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-4">leetpulse Documentation</h1>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Welcome</h2>
        <p className="text-base text-text_primary">
          leetpulse is a spaced-repetition tool for coding problems. It helps
          you review and master problems by analyzing your submissions and
          scheduling optimal review dates.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">How to Use the App</h2>
        <ol className="list-decimal list-inside gap-2 flex flex-col text-text_primary">
          <li>Sign in to your account.</li>
          <li>Browse or add coding problems to your review queue.</li>
          <li>Open a problem and write your solution in the code editor.</li>
          <li>
            Click <b>Submit</b> and wait a few seconds for the analysis.
          </li>
          <li>
            Check the verdict, insights, optimizations, and review schedule.
          </li>
          <li>
            Review problems again based on the suggested due dates to improve
            retention.
          </li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">For Testers</h2>
        <p className="text-text_primary">
          You can test the app by submitting sample code for problems.
          Here&apos;s an example:
        </p>
        <div className="flex p-4">
          <CodeBlock code={code} />
        </div>
        <p className="text-text_primary mt-2">
          Paste this code into the editor for the &quot;Two Sum&quot; problem
          and click Submit to see the analysis.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Tips</h2>
        <ul className="list-disc list-inside gap-1 flex flex-col text-text_primary">
          <li>Preferred language is saved automatically between sessions.</li>
          <li>
            Focus on improving problems marked as &quot;struggling&quot; or
            &quot;learning&quot;.
          </li>
          <li>Use the insights and optimizations to improve your solution.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Contact / Feedback</h2>
        <p className="text-text_primary">
          For any bugs or suggestions, contact the developer at{" "}
          <span className="text-accent">leetpulse@gmail.com</span>.
        </p>
      </section>
    </div>
  );
}
