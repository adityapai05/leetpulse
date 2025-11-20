"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function SettingsModal() {
  const router = useRouter();
  return (
    <div
      className="p-4 sm:flex fixed inset-0 bg-black/50 items-start justify-end sm:pr-20 sm:pt-20
    transition-opacity duration-200 opacity-100 will-change-opacity"
    >
      <div
        className="w-full md:w-1/2 lg:w-1/3 bg-bg1 p-4 rounded-lg shadow-xl border-2 border-border
        transition-all duration-200 translate-y-0 opacity-100 will-change-transform will-change-opacity"
      >
        <div className="flex flex-row justify-between p-4">
          <h2 className="text-xl font-bold">Settings</h2>
          <button
            onClick={() => router.back()}
            className="text-text_muted hover:text-text_primary text-xl"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <SettingOption2 />
          <SettingOption1 />
        </div>
      </div>
    </div>
  );
}

function SettingOption1() {
  const [theme, setTheme] = useState("system");
  useEffect(() => {
    const value =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("theme="))
        ?.split("=")[1] || "system";

    setTheme(value);
  }, []);
  return (
    <div className="flex flex-col p-2">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] font-semibold">
        General
      </h2>
      <div className="flex flex-row w-full justify-between items-center border-b border-border p-2">
        <h3 className="text-sm">Appearance</h3>
        <Select
          value={theme.toLowerCase()}
          onValueChange={(value) => {
            setTheme(value);

            // Write cookie (server can read this during SSR)
            document.cookie = `theme=${value}; path=/; max-age=31536000`;

            // Reload so the server layout applies the right class *before hydration*
            window.location.reload();
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={theme} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="dark-contrast">Dark Constrast</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function SettingOption2() {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(false);
  const [confirmDeleteProgress, setConfirmDeleteProgress] = useState(false);

  const router = useRouter();
  async function handleLogout() {
    try {
      if (!confirmLogout) {
        setConfirmLogout(true);
        toast("Click again to confirm logout", { icon: "⚠️" });
        setTimeout(() => setConfirmLogout(false), 3000);
      } else {
        const res = await fetch("/api/auth/logout");
        if (res.ok) {
          toast.success("Logged out successfully!");
          router.push("/");
        } else {
          toast.error("Log out failed, please try again.");
        }
      }
    } catch {
      toast.error("Log out failed, please try again.");
    }
  }
  async function handleDeleteProgress() {
    try {
      if (!confirmDeleteProgress) {
        setConfirmDeleteProgress(true);
        toast("Click again to confirm progress deletion", { icon: "⚠️" });
        setTimeout(() => setConfirmDeleteProgress(false), 3000);
        return;
      }

      const res = await fetch("/api/progress/delete", { method: "DELETE" });
      if (!res.ok) {
        toast.error("Failed to delete progress");
      } else {
        toast.success("Progress deleted successfully");
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  }
  async function handleDeleteUser() {
    try {
      if (!confirmDeleteUser) {
        setConfirmDeleteUser(true);
        toast("Click again to confirm account deletion", { icon: "⚠️" });
        setTimeout(() => setConfirmDeleteUser(false), 3000);
        return;
      }

      // second tap → real delete
      const deleteRes = await fetch("/api/user/delete", { method: "DELETE" });

      if (!deleteRes.ok) {
        toast.error("Failed to delete account");
        return;
      }

      toast.success("Account deleted");

      const logoutRes = await fetch("/api/auth/logout");

      if (!logoutRes.ok) {
        toast.error("Deleted but failed to logout");
        return;
      }

      router.push("/");
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="flex flex-col p-2">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] font-semibold">
        Account
      </h2>

      <div className="flex flex-row w-full justify-between items-center border-b border-border p-2">
        <h3 className="text-sm">Logout</h3>
        <Button
          variant="inverted"
          size="tertiary"
          text="Logout"
          onClick={handleLogout}
        />
      </div>
      <div className="flex flex-row w-full justify-between items-center border-b border-border p-2">
        <h3 className="text-sm">Delete all progress</h3>
        <Button
          variant="tertiary"
          size="tertiary"
          text="Delete Progress"
          onClick={handleDeleteProgress}
        />
      </div>
      <div className="flex flex-row w-full justify-between items-center border-b border-border p-2">
        <h3 className="text-sm">Delete account</h3>
        <Button
          variant={confirmDeleteUser ? "error" : "error"}
          size="tertiary"
          text={confirmDeleteUser ? "Confirm Delete?" : "Delete Account"}
          onClick={handleDeleteUser}
        />
      </div>
    </div>
  );
}
