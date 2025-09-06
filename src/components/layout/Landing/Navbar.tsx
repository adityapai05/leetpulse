"use client";

import Button from "@/components/layout/Landing/Button";
import Link from "next/link";

export default function Navbar() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="
        sticky top-0 z-50 flex flex-row justify-between px-16 py-4 items-center text-sm
        bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--glass-border)]
      "
    >
      <div className="flex flex-row items-center gap-10">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-text_primary">
          leetpulse
        </Link>

        <button
          onClick={() => handleScroll("whyleetpulse")}
          className="hover:text-accent"
        >
          Why leetpulse?
        </button>

        <button
          onClick={() => handleScroll("howitworks")}
          className="hover:text-accent"
        >
          How it works
        </button>

        <button
          onClick={() => handleScroll("pricing")}
          className="hover:text-accent"
        >
          Pricing
        </button>

        <button
          onClick={() => handleScroll("about")}
          className="hover:text-accent"
        >
          About
        </button>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <Button variant="primary" size="small" text="Login" href="login" />
        <span className="text-sm text-text_muted">or</span>
        <Button variant="primary" size="small" text="Sign Up" href="signup" />
      </div>
    </nav>
  );
}
