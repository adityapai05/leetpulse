"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const pathname = usePathname();
  const user = useUser();
  const username = user?.username || "guest";

  const linkClasses = (path: string) =>
    `hover:text-accent transition-colors ${
      pathname === path ? "text-accent" : "text-text_primary"
    }`;

  return (
    <nav className="bg-bg1 flex flex-row justify-between px-4 sm:px-8 lg:px-16 py-4 text-sm shadow-md">
      {/* Left side: links */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 font-medium">
        <Link className={linkClasses("/explore")} href="/explore">
          Explore
        </Link>
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

      {/* Right side: profile */}
      <div className="flex justify-center mt-4 sm:mt-0">
        <Link className="cursor-pointer" href="/profile">
          <img
            src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${username}&scale=80`}
            alt={`${username} avatar`}
            className="w-6 h-6 rounded-full"
          />
        </Link>
      </div>
    </nav>
  );
}
