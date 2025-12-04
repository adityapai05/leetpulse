"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.webp";
import Image from "next/image";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import MobileNavbar from "./mobile-navbar";

export default function Navbar() {
  const pathname = usePathname();
  const user = useUser();
  const username = user?.username || "guest";

  const linkClasses = (path: string) =>
    `hover:text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] transition-colors ${
      pathname === path
        ? "text-transparent font-bold bg-clip-text bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)]"
        : "text-text_primary"
    }`;

  return (
    <nav className="border-b border-border flex flex-row justify-between px-8 py-4 text-sm shadow-md relative">
      {/* Left side: desktop links */}
      <div className="flex items-center gap-4">
        <Image src={logo} alt="app logo" width={24}></Image>

        {/* Desktop nav links */}
        <div className="hidden sm:flex gap-6">
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
      <div className="flex gap-2 items-center">
        <Link className="" href="/settings">
          <Cog6ToothIcon className="w-6 h-6 text-text_primary hover:text-text_muted mr-4" />
        </Link>
        <Link className="cursor-pointer" href="/profile">
          <img
            src={`https://api.dicebear.com/9.x/shapes/svg?seed=${username}&scale=80`}
            alt={`${username} avatar`}
            className="w-6 h-6 rounded-full"
          />
        </Link>
      </div>

      {/* Mobile bottom navbar */}
      <MobileNavbar />
    </nav>
  );
}
