// app/not-found.tsx
"use client";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import Robot404 from "@/assets/robot404.png";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-[var(--bg-0)] text-[var(--text-primary)] p-6">
        <Image src={Robot404} alt="404 Robot" className="w-1/4" />
        <h1 className="font-extrabold text-xl animate-pulse drop-shadow-lg">
          404 Not Found
        </h1>
        <p className="text-lg mb-4 drop-shadow-md">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="mb-6 text-base text-[var(--text-muted)]">
          Don’t worry, we’ll get you back on track.
        </p>

        <Link href="/">
          <Button variant="inverted" size="big" text="Go back home" />
        </Link>
      </div>
    </>
  );
}
