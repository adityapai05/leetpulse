import clsx from "clsx";
import ProgressBar from "@/components/ui/Progressbar";
import Phases from "@/components/ui/Phases";
import Link from "next/link";

type Props = {
  idx: number;
  questionNo: number;
  question: string;
  iteration: number;
  accuracy: number;
  phase: string;
  dueDate: string;
  slug: string;
};

export default function TableRow({
  idx,
  questionNo,
  question,
  iteration,
  accuracy,
  phase,
  dueDate,
  slug,
}: Props) {
  const bgColor = idx % 2 === 0 ? "bg-bg2" : "";

  const now = new Date();
  const due = new Date(dueDate);
  let dueTextColor = "text-text_primary";
  if (
    due.getDate() === now.getDate() &&
    due.getMonth() === now.getMonth() &&
    due.getFullYear() === now.getFullYear()
  ) {
    dueTextColor = "text-warning";
  } else if (due < now) {
    dueTextColor = "text-error";
  }

  return (
    <Link
      href={`/problems/solve/${slug}`}
      className={clsx("block transition-colors")}
    >
      <div
        className={clsx(
          "grid grid-cols-[1fr_10fr_1fr_2fr_2fr_2fr] h-12 text-sm rounded-lg hover:bg-bg1",
          bgColor
        )}
      >
        <div className="flex justify-center items-center">{questionNo}</div>
        <div className="flex items-center px-4">{question}</div>
        <div className="flex justify-center items-center">{iteration}</div>
        <div className="flex justify-center items-center">
          <div className="w-1/2">
            <ProgressBar value={accuracy} />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Phases variant={phase} />
        </div>
        <div
          className={clsx(
            "flex justify-center items-center text-xs md:text-sm",
            dueTextColor
          )}
        >
          {dueDate}
        </div>
      </div>
    </Link>
  );
}
