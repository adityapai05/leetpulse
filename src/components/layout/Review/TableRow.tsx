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
};

export default function TableRow(props: Props) {
  const { idx, questionNo, question, iteration, accuracy, phase, dueDate } =
    props;

  const bgColor = idx % 2 === 0 ? "bg-bg2" : "bg-bg1";

  // ------------------------------
  // Determine dueDate text color
  // ------------------------------
  const now = new Date();
  const due = new Date(dueDate);
  let dueTextColor = "text-text_primary";

  if (
    due.getDate() === now.getDate() &&
    due.getMonth() === now.getMonth() &&
    due.getFullYear() === now.getFullYear()
  ) {
    dueTextColor = "text-warning"; // due today
  } else if (due < now) {
    dueTextColor = "text-error"; // past due
  }

  return (
    <Link href={`/problems/solve/${questionNo}`} className="block">
      <div
        className={clsx(
          bgColor,
          "flex flex-row w-full justify-between h-12 rounded-xl"
        )}
      >
        <div className="flex justify-center items-center w-[5%]">
          {questionNo}
        </div>
        <div className="flex items-center px-4 w-[50%]">{question}</div>
        <div className="flex items-center justify-center px-4 w-[10%]">
          {iteration}
        </div>
        <div className="px-4 flex justify-center items-center w-[10%]">
          <ProgressBar value={accuracy} />
        </div>
        <div className="flex px-4 justify-center items-center w-[10%]">
          <Phases variant={phase} />
        </div>
        <div
          className={clsx(
            "flex p-4 justify-center items-center w-[15%] text-xs md:text-sm",
            dueTextColor
          )}
        >
          {dueDate}
        </div>
      </div>
    </Link>
  );
}
