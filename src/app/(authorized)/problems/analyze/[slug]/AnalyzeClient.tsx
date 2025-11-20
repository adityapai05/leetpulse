"use client";

import { use, useEffect, useState } from "react";
import { useCodeStore } from "@/lib/stores/CodeStore";
import CodeBlock from "@/components/ui/CodeBlock";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian";
import toast from "react-hot-toast";
import Skeleton from "@/components/layout/Solve/Skeleton";

export default function AnalyzeClient({ slug }: { slug: string }) {
  const code = useCodeStore((state) => state.code);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    const validate = async () => {
      try {
        console.log("Submitting code for analysis...");
        const res = await fetch(`/api/problem/validate/${slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        console.log("Response received from validation API.");
        const data = await res.json();
        if (!res.ok) return toast.error(data.error || "Validation failed.");

        setAnalysis(data.analysis);
        console.log("Analysis received:", data.analysis);
        toast.success(
          data.mastered
            ? "🎉 You’ve mastered this problem. It’s removed from your list!"
            : "✅ Analysis complete!"
        );
      } catch {
        toast.error("Submission failed. Please try again.");
      }
    };

    validate();
  }, [slug]);

  return (
    <div className="flex flex-col gap-2 p-4 m-4 md:flex-row">
      <Analysis analysis={analysis} />
      <CodeSnippet code={code} message="</> Your submitted code" />
    </div>
  );
}

function Analysis({ analysis }: { analysis: any }) {
  if (!analysis) return <Skeleton />;

  return (
    <div className="bg-bg1 flex flex-1 w-1/2 flex-col border-2 border-border rounded-t-lg rounded-b-md">
      <div className="bg-bg2 py-2 px-6 font-thin rounded-t-md text-sm">
        Submission
      </div>

      <div className="flex flex-col px-8 py-4">
        <h2 className="text-sm text-text_muted">Result</h2>
        <h3 className="">
          Your solution is &nbsp;
          {analysis.verdict == "Correct" ? (
            <span className="text-success font-bold">Correct</span>
          ) : (
            <span className="text-error font-bold">Incorrect</span>
          )}
        </h3>
      </div>
      <div className="flex flex-col gap-2 px-8 py-4">
        <h2 className="text-sm text-text_muted">Insights</h2>
        <AnalysisAccordion analysis={analysis} />
      </div>
    </div>
  );
}

function CodeSnippet({ code, message }: { code: string; message?: string }) {
  return (
    <div className="bg-bg1 flex flex-1 flex-col border-2 border-border rounded-t-lg rounded-b-md">
      <div className="bg-bg2 py-2 px-6 text-sm text-primary rounded-t-md">
        {message || "Code"}
      </div>
      <div className="p-4">
        <CodeBlock code={code} />
      </div>
    </div>
  );
}

function AnalysisAccordion({ analysis }: { analysis: any }) {
  return (
    <Accordion type="single" collapsible>
      {analysis.usersComplexity && (
        <AccordionItem value="UC">
          <AccordionTrigger>Your submitted code's complexity </AccordionTrigger>
          <AccordionContent>
            <CompexityDisplay
              time={analysis.usersComplexity.time}
              space={analysis.usersComplexity.space}
            />
          </AccordionContent>
        </AccordionItem>
      )}
      {analysis.bestComplexity && (
        <AccordionItem value="BC">
          <AccordionTrigger>Best possible code's complexity </AccordionTrigger>
          <AccordionContent>
            <CompexityDisplay
              time={analysis.bestComplexity.time}
              space={analysis.bestComplexity.space}
            />
          </AccordionContent>
        </AccordionItem>
      )}
      {analysis.insights && (
        <AccordionItem value="insights">
          <AccordionTrigger>Insights</AccordionTrigger>
          <AccordionContent>{analysis.insights}</AccordionContent>
        </AccordionItem>
      )}
      {analysis.optimizations && (
        <AccordionItem value="optimizations">
          <AccordionTrigger>Optimizations</AccordionTrigger>
          <AccordionContent>{analysis.optimizations}</AccordionContent>
        </AccordionItem>
      )}
      {analysis.failureReasons && (
        <AccordionItem value="failures">
          <AccordionTrigger>Failure Reasons</AccordionTrigger>
          <AccordionContent>{analysis.failureReasons}</AccordionContent>
        </AccordionItem>
      )}
      {analysis.correctionHints && (
        <AccordionItem value="corrections">
          <AccordionTrigger>Correction Hints</AccordionTrigger>
          <AccordionContent>{analysis.correctionHints}</AccordionContent>
        </AccordionItem>
      )}
      {analysis.correctCode && (
        <AccordionItem value="correctCode">
          <AccordionTrigger>Corrected Code</AccordionTrigger>
          <AccordionContent>
            <CodeSnippet code={analysis.correctCode} message="Correct Code" />
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}

function CompexityDisplay({ time, space }: { time: string; space: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)]">
          Time:&nbsp;
        </h2>
        <p>{time}</p>
      </div>
      <div className="flex">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)]">
          Space:&nbsp;
        </h2>
        <p>{space}</p>
      </div>
    </div>
  );
}
