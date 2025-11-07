"use client";

import Button from "@/components/layout/Landing/Button";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.webp";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // close menu after click
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex flex-col md:flex-row justify-between px-6 md:px-8 lg:px-32 py-4 bg-[var(--glass-bg)] backdrop-blur-md border-b border-border gap-4 md:gap-0">
      {/* Logo and Hamburger */}
      <div className="flex flex-row justify-between items-center w-full md:w-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-text_primary"
        >
          <Image src={logo} width={30} alt="app logo"></Image>
          leetpulse
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Links */}
      <div
        className={`flex flex-col md:flex-row gap-2 md:gap-6 mt-2 md:mt-0 w-full md:w-auto ${
          menuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {["whyleetpulse", "howitworks", "pricing", "about"].map((id, i) => (
          <button
            key={i}
            onClick={() => handleScroll(id)}
            className="hover:text-accent text-left md:text-center"
          >
            {id === "whyleetpulse"
              ? "Why leetpulse?"
              : id === "howitworks"
              ? "How it works"
              : id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="flex flex-row flex-wrap gap-2 md:gap-2 items-center mt-2 md:mt-0">
        <Button variant="primary" size="small" text="Login" href="/login" />
        <span className="text-sm text-text_muted">or</span>
        <Button variant="primary" size="small" text="Sign Up" href="/signup" />
      </div>
    </nav>
  );
}
