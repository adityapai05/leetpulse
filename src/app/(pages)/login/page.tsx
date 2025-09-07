"use client";

import Link from "next/link";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Head from "next/head";

interface FormData {
  usernameORemail: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    usernameORemail: "",
    password: "",
  });

  const searchParams = useSearchParams();

  // ✅ run toast once if verified=success
  useEffect(() => {
    const verified = searchParams.get("verified");
    if (verified === "success") {
      toast.success("Your email has been verified! You can now log in.");
    }
  }, [searchParams]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      } else {
        toast.success(data.message);
        router.push("/explore");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <Head>
        <title>Login | leetpulse</title>
      </Head>
      <div className="flex bg-[radial-gradient(at_top_left,var(--bg-2),var(--bg-0))] min-h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center p-2 gap-8 lg:w-1/3  md:w-2/3 sm:w-3/4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full bg-bg2 md:p-8 px-4 py-8 gap-4 rounded-lg shadow-lg"
          >
            <div className="font-bold text-2xl self-center h-16">
              Login to{" "}
              <Link href="/" className="text-accent">
                leetpulse
              </Link>{" "}
              account
            </div>

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
              {/* <div className="flex self-end">
              <Link href="" className="text-accent text-sm underline">
              forgot password?
              </Link>
              </div> */}
            </div>

            <button
              type="submit"
              className="flex justify-center items-center font-bold text-base border p-2 rounded-lg bg-text_primary text-text_contrast hover:border hover:border-text_primary hover:text-text_primary hover:bg-bg2 transition-colors duration-300"
            >
              Login
            </button>

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
