"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TableHead from "@/components/layout/Review/TableHeading";
import TableRow from "@/components/layout/Review/TableRow";
import { Flame, Zap } from "lucide-react";
import { useUser } from "@/context/UserContext";

const reviewTableHeading = {
  head1: "No.",
  head2: "Question",
  head3: "Iteration",
  head4: "Accuracy",
  head5: "Phase",
  head6: "Due Date",
};

export default function ReviewQueue() {
  const user = useUser();
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    async function loadProblems() {
      const res = await fetch("/api/problem/get/all");
      const data = await res.json();
      if (!res.ok) toast.error("Something went wrong. Please try again later.");
      const probs = data.problems || [];
      setProblems(probs);

      const now = new Date();
      const todayStr = now.toDateString(); // e.g. "Fri Sep 06 2025"

      const lastIncrement = localStorage.getItem("lastStreakIncrement");

      let pastDue = false;
      let dueToday = false;

      for (const p of probs) {
        const due = new Date(p.dueDate);
        if (due < now) pastDue = true;
        if (
          due.getDate() === now.getDate() &&
          due.getMonth() === now.getMonth() &&
          due.getFullYear() === now.getFullYear()
        )
          dueToday = true;
      }

      if (pastDue) {
        const res = await fetch("/api/user/streak/reset", { method: "POST" });
        if (res.ok) {
          localStorage.setItem("lastStreakIncrement", todayStr);
        }
      } else if (!dueToday && lastIncrement !== todayStr) {
        const res = await fetch("/api/user/streak/increment", {
          method: "POST",
        });
        if (res.ok) {
          localStorage.setItem("lastStreakIncrement", todayStr);
        }
      }
    }

    loadProblems();
  }, []);

  return (
    <div className="flex flex-col mx-4 gap-8 p-4 md:mx-16">
      <ReviewTable problems={problems} />
    </div>
  );
}

function Header({
  user,
}: {
  user: { firstName: string; streak: number; xp: number };
}) {
  return (
    <div className="flex justify-between flex-col md:flex-row p-4 gap-4">
      <div className="flex flex-col">
        <div className="text-5xl font-black text-text_primary">
          {user.firstName}
        </div>
        <div className="text-sm text-text_muted">
          Your past problems have been missing you
        </div>
      </div>
      <div className="flex flex-row items-center gap-4 p-4 ">
        <BadgeFlame value={user.streak} />
        <BadgeZap value={user.xp} />
      </div>
    </div>
  );
}

function BadgeFlame({ value }: { value: number }) {
  return (
    <div className="ring-1 ring-inset ring-text_muted bg-bg2 flex flex-row items-center justify-center rounded-full text-sm px-4 py-1">
      <svg width="20" height="20" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="flameStroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--error)" />
            <stop offset="100%" stopColor="var(--warning)" />
          </linearGradient>
        </defs>
        <Flame stroke="url(#flameStroke)" strokeWidth={2} />
      </svg>
      &nbsp;&nbsp;
      <span className="text-base font-medium text-text_primary">{value}</span>
    </div>
  );
}

function BadgeZap({ value }: { value: number }) {
  return (
    <div className="ring-1 ring-inset ring-text_muted bg-bg2 flex flex-row items-center justify-center rounded-full text-sm px-4 py-1">
      <Zap strokeWidth={2} width={20} color="var(--accent)" />
      &nbsp;&nbsp;
      <span className="text-base font-medium text-text_primary">{value}</span>
    </div>
  );
}

function ReviewTable({ problems }: { problems: any[] }) {
  let rows = [];

  if (problems.length === 0) {
    rows.push(
      <div key="empty" className="p-4 text-text_muted">
        No problems found.
      </div>
    );
  } else {
    for (let i = 0; i < problems.length; i++) {
      const p = problems[i];
      const accuracy =
        p.iteration > 0 ? Math.round((p.correct / p.iteration) * 100) : 0;
      const formattedDate = new Date(p.dueDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      rows.push(
        <TableRow
          key={p._id || i}
          idx={i}
          questionNo={p.problemNo}
          question={p.problemName}
          iteration={p.iteration}
          accuracy={accuracy}
          phase={p.phase}
          dueDate={formattedDate}
        />
      );
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col p-4">
        <h1 className="font-bold text-text_primary text-3xl">Review</h1>
        <p className="text-sm text-text_muted">
          You have solved it once. Now let’s make it stick
        </p>
      </div>
      <div className="flex flex-col p-4">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <TableHead {...reviewTableHeading} />
            {rows}
          </div>
        </div>
      </div>
    </div>
  );
}
