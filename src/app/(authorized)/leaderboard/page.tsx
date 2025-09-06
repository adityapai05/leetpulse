"use client";

import TableRow from "@/components/layout/Leaderboard/TableRow";
import TableHeading from "@/components/layout/Leaderboard/TableHeading";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const heading = {
  head1: "Rank",
  head2: "Username",
  head3: "XP",
};

export default function Leaderboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function getLeaderboard() {
      const res = await fetch("/api/leaderboard/get");
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }
      setData(data.leaderboardList);
    }
    getLeaderboard();
  }, []);

  return (
    <div className="bg-bg1 flex flex-col gap-6 mx-4 sm:mx-16 my-8 p-6 sm:p-8 rounded-md shadow-md border-2 border-bg2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <span className="text-xl sm:text-2xl font-bold">
          Leaderboard Ranking
        </span>
        <span className="text-xs sm:text-sm text-text_muted">
          (based on XP)
        </span>
      </div>

      {/* Table */}
      <div className="">
        <div className="flex flex-col">
          <TableHeading {...heading} />
          {data.length > 0 ? (
            data.map((item, idx) => <TableRow key={idx} {...item} />)
          ) : (
            <span className="text-text_muted text-sm p-4 text-center">
              No leaderboard data yet.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
