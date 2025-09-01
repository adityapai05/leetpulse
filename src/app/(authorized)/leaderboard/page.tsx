"use client";

import TableRow from "@/components/layout/Leaderboard/TableRow";
import TableHeading from "@/components/layout/Leaderboard/TableHeading";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const heading = {
  head1: "Rank",
  head2: "Username",
  head3: "XP",
  head4: "Avg. Iteration",
};

export default function Leaderboard() {
  const [data, setData] = useState([]);

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
    <div className="bg-bg1 flex flex-col gap-8 mx-16 my-8 p-4 rounded-md shadow-md">
      <div className="flex flex-row gap-2 items-center">
        <span className="text-2xl font-bold">Leaderboard Ranking</span>
        <span className="text-sm text-text_muted">
          (based on XP and iteration)
        </span>
      </div>
      {/* Table below */}
      <div className=" flex flex-col">
        <TableHeading {...heading} />
        {data.map((item, idx) => (
          <TableRow key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}
