"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function handleSubmit() {
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      });
      const data = res.json();
      if (!res.ok) {
        // toast.error(data.error || "Something went wrong, please try again");
      }
    } catch {}
  }

  return (
    <div className="flex flex-col justify-center items-center p-32 gap-4">
      <h2 className="text-2xl font-semibold">Forgot your password?</h2>
      <p className="text-text_muted">
        A code will be sent to your email to help you reset your password
      </p>
      <form action={handleSubmit} className="flex flex-col gap-6 p-4 w-1/3">
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        <Button variant="primary" type="submit" size="big" text="Send email" />
      </form>
      <Link href={"/login"}>
        <Button
          variant="tertiary"
          type="button"
          size="tertiary"
          text="<- Back to login"
        />
      </Link>
    </div>
  );
}
