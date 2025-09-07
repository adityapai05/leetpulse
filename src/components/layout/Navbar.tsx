"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const user = useUser();
  const username = user?.username || "guest";
  const [open, setOpen] = useState(false);

  const linkClasses = (path: string) =>
    `hover:text-accent transition-colors ${
      pathname === path ? "text-accent" : "text-text_primary"
    }`;

  return (
    <nav className="bg-bg1 flex flex-row justify-between px-8 sm:px-8 lg:px-20 py-4 text-sm shadow-md relative">
      {/* Left side: desktop links */}
      <div className="flex items-center gap-10">
        <Link href="/" className="font-bold text-lg">
          leetpulse
        </Link>

        {/* Desktop nav links */}
        <div className="hidden sm:flex gap-6 font-medium">
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
      </div>

      {/* Right side: profile (desktop only) */}
      <div className="hidden sm:flex items-center">
        <Link className="cursor-pointer" href="/profile">
          <img
            src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${username}&scale=80`}
            alt={`${username} avatar`}
            className="w-6 h-6 rounded-full"
          />
        </Link>
      </div>

      {/* Mobile hamburger (right) */}
      <button
        className="sm:hidden flex items-center"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile dropdown (left aligned) */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-bg1 shadow-md flex flex-col p-4 gap-4 sm:hidden">
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
          <Link className="cursor-pointer" href="/profile">
            <img
              src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${username}&scale=80`}
              alt={`${username} avatar`}
              className="w-6 h-6 rounded-full"
            />
          </Link>
        </div>
      )}
    </nav>
  );
}
