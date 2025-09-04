"use client";

import Input from "@/components/ui/Input";
import Link from "next/link";
import toast from "react-hot-toast";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
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

    try {
      const res = await fetch("/api/auth/user/signup", {
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
      if (data.message == "token created!") {
        router.push("/check-mail");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex bg-[radial-gradient(at_top_left,var(--bg-2),var(--bg-0))] min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-8 lg:w-1/3 md:w-2/3 sm:w-3/4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full bg-bg2 p-8 gap-4 rounded-lg shadow-md"
        >
          <div className="font-bold text-2xl self-center h-16">
            Create a{" "}
            <Link href="/" className="text-accent">
              LeetPulse
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

          <button
            type="submit"
            className="flex justify-center items-center font-bold text-base border p-2 rounded-lg bg-text_primary text-text_contrast shadow-md hover:border-text_primary hover:text-text_primary hover:bg-bg2 transition-colors duration-300"
          >
            Sign Up
          </button>

          <div className="flex text-sm text-text_muted self-center">
            Already have an account?&nbsp;
            <Link href="/login" className="text-accent underline font-bold">
              login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
