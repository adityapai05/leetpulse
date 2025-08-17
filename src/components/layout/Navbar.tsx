"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `hover:text-accent ${
      pathname === path ? "text-accent" : "text-text_primary"
    }`;

  return (
    <nav className="bg-bg1 flex flex-row justify-between px-16 py-4 text-sm shadow-md">
      <div className="flex flex-row gap-6 px-4 font-medium">
        <Link className={linkClasses("/review")} href="/review">
          Review
        </Link>
        <Link className={linkClasses("/problems/add")} href="/problems/add">
          Add Questions
        </Link>
        <Link className={linkClasses("/leaderboard")} href="/leaderboard">
          Leaderboard
        </Link>
      </div>
    </nav>
  );
}
