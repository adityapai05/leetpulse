import ValueKeyDisplay from "@/components/ui/ValueKeyDisplay";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CircleUserRound } from "lucide-react";

type Props = {
  name: string;
  username: string;
  rank: number;
  level: number;
  xp: number;
  dateJoined: string;
};

export default function UserProfileCard({
  name,
  username,
  rank,
  level,
  xp,
  dateJoined,
}: Props) {
  const router = useRouter();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogoutClick = async () => {
    if (!confirmLogout) {
      setConfirmLogout(true);
      toast("Click again to confirm logout", { icon: "⚠️" });
      setTimeout(() => setConfirmLogout(false), 3000);
    } else {
      const res = await fetch("/api/auth/user/logout");
      if (res.ok) {
        toast.success("Logged out successfully!");
        router.push("/");
      } else {
        toast.error("Log out failed, please try again.");
      }
    }
  };

  return (
    <div className="bg-[radial-gradient(at_top_left,var(--bg-0),var(--bg-1))] flex flex-col gap-4 items-center px-4 py-8 w-full sm:w-3/4 md:w-1/2 lg:w-full rounded-md">
      <div className="rounded-full h-32 w-32 border flex items-center justify-center bg-bg0">
        <CircleUserRound
          strokeWidth={1}
          width={100}
          height={100}
          color="var(--text-primary)"
        />
      </div>

      <ValueKeyDisplay title={username} value={name} />

      {/* Responsive stats layout */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-center">
        <ValueKeyDisplay title="Rank" value={rank} />
        <ValueKeyDisplay title="Level" value={level} />
        <ValueKeyDisplay title="XP" value={xp} />
      </div>

      <ValueKeyDisplay
        title="Date joined"
        value={dateJoined}
        className="text-sm mt-auto"
      />

      <button
        onClick={handleLogoutClick}
        className="rounded-xl px-8 py-2 bg-error font-semibold border border-error hover:bg-bg2"
      >
        Logout
      </button>
    </div>
  );
}
