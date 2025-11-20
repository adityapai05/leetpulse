"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import toast from "react-hot-toast";
import logo from "@/assets/logo.webp";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validations = [
      {
        valid: formData.firstName.trim(),
        msg: "Please enter your first name.",
      },
      { valid: formData.username.trim(), msg: "Please enter username." },
      { valid: formData.email.trim(), msg: "Please enter email." },
      {
        valid: formData.password.trim() && formData.confirmPassword.trim(),
        msg: "Please enter password in both fields",
      },
      {
        valid: formData.password === formData.confirmPassword,
        msg: "Password and Confirm Password must match",
      },
    ];

    for (const v of validations) {
      if (!v.valid) {
        toast.error(v.msg);
        return;
      }
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Signup failed");
        return;
      }
      if (data.message == "Verification email sent!") {
        router.push("/check-mail");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex w-screen h-screen">
        <div className="bg-bg1 hidden md:flex flex-col justify-center items-center flex-1">
          <h2 className="text-base font-medium text-text_primary tracking-wide mt-2">
            Welcome to leetpulse — where consistency builds mastery.
          </h2>
          <Image
            src={logo}
            alt="leetpulse logo"
            width={128 * 2}
            className="opacity-90"
          />
          <p className="text-sm text-text_secondary max-w-md mt-1">
            Sign up to begin your spaced-repetition journey and turn every
            solved problem into progress.
          </p>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-3/4 p-8 gap-4 rounded-lg shadow-md"
          >
            <div className="font-bold text-2xl self-center h-16">
              Create a{" "}
              <Link
                href="/"
                className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)]"
              >
                leetpulse
              </Link>{" "}
              account
            </div>

            <Input
              label="First name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              label="Create a username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="flex flex-col gap-2 justify-between sm:flex-row">
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="text-text_muted text-sm">
              By signing up, you agree to our{" "}
              <Link
                href="/terms"
                target="_blank"
                className="text-accent underline"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                target="_blank"
                className="text-accent underline"
              >
                Privacy Policy
              </Link>
              .
            </div>

            <Button
              variant="inverted"
              type="submit"
              size="big"
              text={loading ? "Signing Up..." : "Sign Up"}
              loading={loading}
            />

            <div className="flex text-sm text-text_muted self-center">
              Already have an account?&nbsp;
              <Link href="/login" className="text-accent underline font-bold">
                login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
