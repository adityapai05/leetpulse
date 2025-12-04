import Link from "next/link";
import Image from "next/image";
import {
  SparklesIcon,
  QueueListIcon,
  PlusIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function MobileNavbar() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `w-1/6 flex flex-col items-center text-xs rounded-md p-1 ${
      pathname === path ? "bg-bg1 border border-border shadow-md" : ""
    }`;

  return (
    <div className="sm:hidden fixed bottom-0 left-0 w-full bg-bg0 border-t border-border shadow-lg flex justify-around items-center py-2 z-50">
      <Link href="/explore" className={linkClasses("/explore")}>
        <SparklesIcon className="w-6 h-6 flex justify-center items-center rounded-md text-accent p-1" />
        <span className="text-text_primary">Explore</span>
      </Link>

      <Link href="/review" className={linkClasses("/review")}>
        <QueueListIcon className="w-6 h-6 flex justify-center items-center rounded-md text-accent p-1" />
        <span className="text-text_primary">Review</span>
      </Link>

      <Link href="/problems/add" className={linkClasses("/problems/add")}>
        <PlusIcon className="w-6 h-6 flex justify-center items-center rounded-md text-accent p-1" />
        <span className="text-text_primary">Add</span>
      </Link>

      <Link href="/leaderboard" className={linkClasses("/leaderboard")}>
        <TrophyIcon className="w-6 h-6 flex justify-center items-center rounded-md text-accent p-1" />
        <span className="text-text_primary">Ranks</span>
      </Link>
    </div>
  );
}
