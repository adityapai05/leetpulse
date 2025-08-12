"use client";

import Input from "@/components/ui/Input";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, // keep all existing fields unchanged
      [e.target.name]: e.target.value, // update only the field that changed
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");
    if (formData.firstName.trim().length == 0) {
      toast.error("Please enter your first name.");
      return;
    }
    if (formData.username.trim().length == 0) {
      toast.error("Please enter username.");
      return;
    }
    if (formData.email.trim().length == 0) {
      toast.error("Please enter email");
      return;
    }
    if (
      formData.password.trim().length == 0 ||
      formData.confirmPassword.trim().length == 0
    ) {
      toast.error("Please enter password in both fields");
      return;
    }
    if (formData.password != formData.confirmPassword) {
      toast.error("Password and Confirm Password must match");
      return;
    }
    try {
      const res = await fetch("/api/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex bg-[radial-gradient(at_top_left,var(--bg-2),var(--bg-0))] min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-8 lg:w-1/3  md:w-2/3 sm:w-3/4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full bg-bg2 p-8 gap-4 rounded-lg shadow-md"
        >
          {/* Page Heading, redirect to landing page */}
          <div className="font-bold text-2xl self-center h-16">
            Create a{" "}
            <Link href="" className="text-accent">
              LeetPulse
            </Link>{" "}
            account
          </div>

          {/* Form Inputs */}
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

          {/* Need a privacy policy , terms and condition */}
          <button
            type="submit"
            className="flex justify-center items-center font-bold text-base border p-2 rounded-lg bg-text_primary text-text_contrast shadow-md hover:border hover:border-text_primary hover:text-text_primary hover:bg-bg2 transition-colors duration-300"
          >
            Sign Up
          </button>

          {/* Redirect to login page */}
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
