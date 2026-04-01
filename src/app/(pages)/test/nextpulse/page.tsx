"use client";
import { useState } from "react";
import NextPulse from "@/lib/nextPulse";

export default function Page() {
  const [iteration, setIteration] = useState(1);
  const [accuracy, setAccuracy] = useState(50);
  const [verdict, setVerdict] = useState("Correct");
  const [level, setLevel] = useState(1);

  const result = NextPulse({
    iteration,
    accuracy,
    verdict,
    level,
  });

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-accent">NextPulse Tester</h1>

      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label>Iteration: {iteration}</label>
          <input
            type="range"
            min={1}
            max={15}
            value={iteration}
            onChange={(e) => setIteration(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label>Accuracy: {accuracy}%</label>
          <input
            type="range"
            min={0}
            max={100}
            value={accuracy}
            onChange={(e) => setAccuracy(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label>Verdict:</label>
          <select
            value={verdict}
            onChange={(e) => setVerdict(e.target.value)}
            className="border p-2 w-full"
          >
            <option>Correct</option>
            <option>Incorrect</option>
          </select>
        </div>

        <div>
          <label>Level:</label>
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="border p-2 w-full"
          >
            <option value={1}>Easy (1)</option>
            <option value={2}>Medium (2)</option>
            <option value={3}>Hard (3)</option>
          </select>
        </div>
      </div>

      {/* Output */}
      <div className="border p-4 rounded-xl space-y-2">
        <h2 className="font-bold text-lg text-accent_light">Output</h2>
        <p>
          <strong>Phase:</strong> {result.phase}
        </p>
        <p>
          <strong>Interval:</strong> {result.interval} days
        </p>
        <p>
          <strong>Mastered:</strong> {result.isMastered ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}
