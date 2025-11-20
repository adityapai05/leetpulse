"use client";
import Button from "@/components/ui/Button";

export default function ToDocumentation() {
  function handleReadDocsClick() {
    window.open(`${process.env.NEXT_PUBLIC_BASE_URL}/docs`, "_blank");
  }
  return (
    <div className="flex flex-col gap-2 p-4">
      <h2 className="text-xl font-bold">Read Documentation</h2>
      <p className="text-text_muted">
        Learn how to use LeetPulse for spaced-repetition practice in DSA.
        LeetCode questions are copyrighted by LeetCode.
      </p>
      <div>
        <Button
          variant="inverted"
          size="tertiary"
          text="Read Docs"
          onClick={handleReadDocsClick}
        />
      </div>
    </div>
  );
}
