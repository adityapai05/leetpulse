"use client";

import Link from "next/link";
import Button from "@/components/layout/Landing/Button";

export default function Navbar() {
  return (
    <nav
      className="
    sticky top-0 z-50 flex flex-row justify-between px-16 py-4 items-center text-sm
    bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--glass-border)]
  "
    >
      <div className="flex flex-row items-center gap-10">
        {/* Logo or text */}
        <Link className="text-xl font-bold text-text_primary" href="/">
          leetpulse
        </Link>
        <Link className="hover:text-accent" href="#whyleetpulse">
          Why leetpulse?
        </Link>
        <Link className="hover:text-accent" href="#howitworks">
          How it works
        </Link>
        <Link className="hover:text-accent" href="#pricing">
          Pricing
        </Link>
        <Link className="hover:text-accent" href="#about">
          About
        </Link>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Button variant="primary" size="small" text="Login" href="login" />
        <span className="text-sm text-text_muted">or</span>
        <Button variant="primary" size="small" text="Sign Up" href="signup" />
      </div>
    </nav>
  );
}
