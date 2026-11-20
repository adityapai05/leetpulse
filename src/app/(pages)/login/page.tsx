"use client";

import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import GoogleButton from "@/components/ui/GoogleButton";
import { googleErrorMessage } from "@/lib/google/messages";
import toast from "react-hot-toast";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Head from "next/head";

import Image from "next/image";

import logo from "@/assets/logo.webp";

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

    const googleMessage = googleErrorMessage(searchParams.get("google"));
    if (googleMessage) {
      toast.error(googleMessage);
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
      <main className="flex items-center justify-center w-screen h-screen p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-bg1 w-full rounded-md border border-border flex flex-col sm:w-4/5 md:2/3 lg:w-1/3 md:p-8 px-4 py-8 gap-4"
        >
          <div className="flex flex-col items-center justify-center">
            <Image src={logo} alt="leetpulse logo" width={64} height={64} />
            <h2 className="text-2xl font-medium tracking-wide">leetpulse</h2>
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
            <div className="flex self-end">
              <Link
                href="/forgot-password"
                className="text-accent text-sm underline"
              >
                forgot password?
              </Link>
            </div>
          </div>

          <Button
            variant="inverted"
            type="submit"
            size="big"
            text={loading ? "Logging in..." : "Login"}
            loading={loading}
          />

          <div className="flex items-center gap-3 text-xs text-text_muted">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>
          <GoogleButton />

          <div className="flex text-sm self-center">
            New here?&nbsp;
            <Link href="/signup" className="text-accent underline font-bold">
              sign up
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
