"use client";

import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Head from "next/head";
import logo from "@/assets/logo.webp";
import Image from "next/image";

interface FormData {
  usernameORemail: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login | leetpulse</title>
      </Head>
      <div className="flex w-screen h-screen">
        <div className="bg-bg1 hidden md:flex flex-col justify-center items-center flex-1">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-2xl font-semibold tracking-wide">
            leetpulse
          </h1>
          <Image
            src={logo}
            alt="leetpulse logo"
            width={128 * 2}
            className="opacity-90"
          />

          <h2 className="text-base font-medium text-text_primary tracking-wide mt-2">
            You’re back. Let’s finish what you started.
          </h2>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-bg1 flex flex-col w-3/4 md:p-8 px-4 py-8 gap-4 rounded-xl shadow-lg"
          >
            <div className="font-bold text-xl self-center h-16">
              Login to{" "}
              <Link
                href="/"
                className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)]"
              >
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

            <Button
              variant="inverted"
              type="submit"
              size="big"
              text={loading ? "Logging in..." : "Login"}
              loading={loading}
            />

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
