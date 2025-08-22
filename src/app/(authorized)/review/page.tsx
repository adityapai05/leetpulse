"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/ui/Progressbar";
import Phases from "@/components/ui/Phases";

export default function ReviewQueue() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const res = await fetch("/api/problem/get");
      const data = await res.json();
      setProblems(data.problems || []);
      console.log(data);
    }
    loadProblems();
  }, []);

  return (
    <div className="flex flex-col mx-16 gap-8 p-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col py-8">
          <span className="font-extrabold text-text_primary text-5xl">
            JOHN WICK
          </span>
          <span className="text-text_muted">
            Welcome back. Your past problems have been missing you.
          </span>
        </div>
        <div className=" flex flex-row items-center gap-4">
          <div className="bg-bg2 border-text_muted font-normal flex border rounded-full text-sm px-4 py-0">
            XP 900
          </div>
          <div className="bg-bg2 border-text_muted font-normal flex border rounded-full text-sm px-4 py-0">
            🔥 10
          </div>
        </div>
      </div>
      <div className="bg-bg1 flex flex-col rounded-md gap-8 shadow-md p-4">
        <div className="flex flex-col p-4">
          <span className="font-semibold text-text_primary text-2xl">
            Review
          </span>
          <span className="text-text_muted">
            You have solved it once. Now let’s make it stick
          </span>
        </div>
        <div className="flex p-3">
          <table className="w-full">
            <thead className="">
              <tr>
                <th className="text-sm font-medium p-2 w-[5%]">No.</th>
                <th className="text-sm font-medium p-2 text-left">Question</th>
                <th className="text-sm font-medium p-2 w-[10%]">Iteration</th>
                <th className="text-sm font-medium p-2 w-[10%]">
                  Memory Retention
                </th>
                <th className="text-sm font-medium p-2 w-[10%]">Phase</th>
                <th className="text-sm font-medium p-2 w-[10%]">Due Date</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {problems.map((p: any, i: number) => (
                <tr
                  key={p.problemNo}
                  className={`${
                    i % 2 === 0 ? "bg-bg2" : "bg-bg1"
                  } hover:bg-bg1 transition`}
                >
                  <td className="p-3 rounded-l-md font-normal">
                    <Link
                      href={`/problems/solve/${p.problemNo}`}
                      className="block w-full h-full"
                    >
                      {p.problemNo}
                    </Link>
                  </td>
                  <td className="p-3 text-left font-normal">
                    <Link
                      href={`/problems/solve/${p.problemNo}`}
                      className="block w-full h-full"
                    >
                      {p.problemName}
                    </Link>
                  </td>
                  <td className="p-3 font-normal">{p.iteration}</td>
                  <td className="p-3 font-normal">
                    <ProgressBar value={p.retention} max={100} />
                  </td>
                  <td className="p-3 font-normal">
                    <Phases variant={p.phase} />
                  </td>
                  <td className="p-3 rounded-r-md font-normal text-sm">
                    {new Date(p.dueDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
