"use client";

import Link from "next/link";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    usernameORemail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, // keep all existing fields unchanged
      [e.target.name]: e.target.value, // update only the field that changed
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.usernameORemail.trim().length == 0) {
      toast.error("Please enter username.");
      return;
    }
    if (formData.password.trim().length == 0) {
      toast.error("Please enter password");
      return;
    }
    try {
      const res = await fetch("/api/auth/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameORemail: formData.usernameORemail,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <div className="flex bg-[radial-gradient(at_top_left,var(--bg-2),var(--bg-0))] min-h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-8 lg:w-1/3  md:w-2/3 sm:w-3/4">
          {/* Page Heading, redirect to landing page */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full bg-bg2 p-8 gap-4 rounded-lg shadow-lg"
          >
            <div className="font-bold text-2xl self-center h-16">
              Login to{" "}
              <Link href="" className="text-accent">
                LeetPulse
              </Link>{" "}
              account
            </div>

            {/* Form Inputs */}
            <Input
              label="Username or email"
              name="usernameORemail"
              type="text"
              value={formData.usernameORemail}
              onChange={handleChange}
            />
            <div className="flex flex-col gap-1">
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="flex self-end">
                <Link href="" className="text-accent text-sm underline">
                  forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="flex justify-center items-center font-bold text-base border p-2 rounded-lg bg-text_primary text-text_contrast hover:border hover:border-text_primary hover:text-text_primary hover:bg-bg2 transition-colors duration-300"
            >
              Login
            </button>

            {/* Redirect to login page */}
            <div className="flex text-sm self-center">
              New here?&nbsp;
              <Link href="/signup" className="text-accent underline font-bold">
                sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
