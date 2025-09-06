"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      toast.error("Verification token missing");
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/auth/user/verify?token=${token}`);
        if (res.ok) {
          toast.success("Email verified successfully!");
          router.push("/login");
        } else {
          const data = await res.json();
          toast.error(data.error || "Verification failed");
        }
      } catch (err) {
        toast.error("Server error. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <p className="text-text_primary text-lg">Verifying your email...</p>
      ) : (
        <p className="text-text_primary text-lg">Redirecting...</p>
      )}
    </div>
  );
}
