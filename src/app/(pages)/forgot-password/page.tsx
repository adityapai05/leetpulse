"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailOrUsername(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong, please try again");
        return;
      }
      toast.success(data.message);
    } catch {
      toast.error("Network error, please try again");
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-16 lg:p-32 gap-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-center">
        Forgot your password?
      </h2>
      <p className="text-text_muted text-center">
        A code will be sent to your email to help you reset your password
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-4 w-full md:w-2/3 lg:w-1/2"
      >
        <Input
          label="Email Address or Username"
          name="emailOrUsername"
          type="text"
          placeholder="Enter email id or username"
          value={emailOrUsername}
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
