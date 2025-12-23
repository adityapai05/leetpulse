"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordClient() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const pwChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=[\]{};:"\\|,.<>/?]/.test(password),
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Both fields must match");
      return;
    }
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong, please try again");
      }
      toast.success(data.message);
    } catch {
      toast.error("Something went wrong, please try again");
    }
  }

  //   if (!token) {
  //     return <h1>No Valid Token</h1>;
  //   }
  return (
    <div className="flex flex-col justify-center items-center p-32 gap-4">
      <h2 className="text-2xl font-semibold">Reset your password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4 w-1/3">
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Enter confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="flex flex-col gap-1 text-xs text-text_muted">
          <div className="flex flex-row gap-4">
            <span className={pwChecks.length ? "text-success" : "text-error"}>
              • At least 8 characters
            </span>
            <span className={pwChecks.upper ? "text-success" : "text-error"}>
              • One uppercase letter
            </span>
          </div>
          <div className="flex flex-row gap-4">
            <span className={pwChecks.number ? "text-success" : "text-error"}>
              • One number
            </span>
            <span className={pwChecks.special ? "text-success" : "text-error"}>
              • One special character
            </span>
          </div>
        </div>
        <Button
          variant="primary"
          type="submit"
          size="big"
          text="Reset password"
        />
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
