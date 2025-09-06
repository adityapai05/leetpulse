// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-0)] text-[var(--text-primary)] p-6">
      <h1 className="text-[4rem] font-extrabold animate-pulse drop-shadow-lg">
        404
      </h1>
      <p className="text-xl md:text-xl mb-4 drop-shadow-md">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <p className="mb-6 text-base md:text-lg text-[var(--text-muted)]">
        Don’t worry, we’ll get you back on track.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-[var(--accent)] text-[var(--bg-0)] font-semibold rounded-full shadow-lg hover:scale-105 hover:brightness-110 transition-transform duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
}
