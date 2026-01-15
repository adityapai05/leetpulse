// MobileNavbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/layout/Landing/Button";
import logo from "@/assets/logo.webp";
import { Menu, X } from "lucide-react";

export function MobileNavbar({ navLinks }: { navLinks: any }) {
  const [open, setOpen] = useState(false);

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <div className="md:hidden w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2"
        >
          <Menu />
          Menu
        </button>

        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image src={logo} width={30} alt="app logo" />
        </Link>
      </div>

      {/* Overlay menu */}
      {open && (
        <div className="opacity-95 absolute z-50 top-0 left-0 bg-bg1 flex flex-col gap-4 w-full p-8">
          <button onClick={() => setOpen(false)} className="self-start">
            <X />
          </button>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScroll(link.id)}
              className="text-left text-lg hover:text-accent"
            >
              {link.label}
            </button>
          ))}

          <div className="mt-4 flex flex-col gap-4">
            <Button variant="primary" size="small" text="Login" href="/login" />
            <Button
              variant="primary"
              size="small"
              text="SignUp"
              href="/signup"
            />
          </div>
        </div>
      )}
    </div>
  );
}
