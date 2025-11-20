"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TableHead from "@/components/layout/Review/TableHeading";
import TableRow from "@/components/layout/Review/TableRow";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const reviewTableHeading = {
  head1: "No.",
  head2: "Question",
  head3: "Iteration",
  head4: "Accuracy",
  head5: "Phase",
  head6: "Due Date",
};

export default function ReviewQueue() {
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    async function loadProblems() {
      const res = await fetch("/api/problem/get/all");
      const data = await res.json();
      if (!res.ok) toast.error("Something went wrong. Please try again later.");
      const probs = data.problems || [];
      setProblems(probs);
    }

    loadProblems();
  }, []);

  return (
    <div className="flex flex-col mx-4 gap-8 p-4 md:mx-16">
      <ReviewTable problems={problems} />
    </div>
  );
}

function ReviewTable({ problems }: { problems: any[] }) {
  const router = useRouter();
  function handleRedirect() {
    router.push("/problems/add");
  }
  let rows = [];

  if (problems.length === 0) {
    rows.push(
      <div
        key="empty"
        className="flex flex-col gap-2 justify-center items-center p-4 text-text_muted"
      >
        <p>No questions in review queue. Plase add new quetion</p>
        <Button size="tertiary" text="Add Questions" onClick={handleRedirect} />
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
          slug={p.slug}
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
