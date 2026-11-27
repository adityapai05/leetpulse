"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import GoogleButton from "@/components/ui/GoogleButton";
import Link from "next/link";
import toast from "react-hot-toast";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.webp";

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

  const strongPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:"\\|,.<>/?]).{8,}$/;

  const pwChecks = {
    length: formData.password.length >= 8,
    upper: /[A-Z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[!@#$%^&*()_+\-=[\]{};:"\\|,.<>/?]/.test(formData.password),
  };

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
    {
      valid: strongPassword.test(formData.password),
      msg: "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 number, and 1 special character.",
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
      <main className="flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-bg1 flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/3 px-8 py-4 gap-3 border border-border rounded-lg"
        >
          <div className="flex flex-col items-center justify-center">
            <Image src={logo} alt="leetpulse logo" width={32} height={32} />
            <h2 className="text-2xl font-medium tracking-wide">leetpulse</h2>
          </div>

          <Input
            label="First name"
            name="firstName"
            type="text"
            placeholder="Minimum 3 characters"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            label="Create a username"
            name="username"
            type="text"
            placeholder="min. 5 characters, max. 12 characters"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="put your actual mail, I will send a verification link, dont bullshit"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
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
              <span
                className={pwChecks.special ? "text-success" : "text-error"}
              >
                • One special character
              </span>
            </div>
          </div>

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
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

          <div className="flex items-center gap-3 text-xs text-text_muted">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>
          <GoogleButton />

          <div className="flex text-sm text-text_muted self-center">
            Already have an account?&nbsp;
            <Link href="/login" className="text-accent underline font-bold">
              login
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
