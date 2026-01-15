"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/layout/Landing/Button";
import logo from "@/assets/logo.webp";

export function DesktopNavbar({ navLinks }: { navLinks: any }) {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hidden md:flex w-full items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-xl font-bold">
        <Image src={logo} width={30} alt="app logo" />
        leetpulse
      </Link>

      {/* Nav links */}
      <div className="flex gap-6">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleScroll(link.id)}
            className="text-sm hover:text-accent"
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Auth */}
      <div className="flex items-center gap-2">
        <Button variant="primary" size="small" text="Login" href="/login" />
        <span className="text-sm text-text_muted">or</span>
        <Button variant="primary" size="small" text="SignUp" href="/signup" />
      </div>
    </div>
  );
}
