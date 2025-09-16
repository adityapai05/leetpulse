import ValueKeyDisplay from "@/components/ui/ValueKeyDisplay";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Button from "@/components/ui/Button";

type Props = {
  name: string;
  rank: number;
  level: number;
  xp: number;
  dateJoined: string;
};

export default function UserProfileCard({
  name,
  rank,
  level,
  xp,
  dateJoined,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const user = useUser();
  const username = user?.username || "guest";
  console.log(username);

  const handleLogoutClick = async () => {
    try {
      if (!confirmLogout) {
        setConfirmLogout(true);
        toast("Click again to confirm logout", { icon: "⚠️" });
        setTimeout(() => setConfirmLogout(false), 3000);
      } else {
        setLoading(true);
        const res = await fetch("/api/auth/user/logout");
        if (res.ok) {
          toast.success("Logged out successfully!");
          router.push("/");
        } else {
          toast.error("Log out failed, please try again.");
        }
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[radial-gradient(at_top_left,var(--bg-0),var(--bg-1))] flex flex-col gap-4 items-center px-4 py-8 w-full sm:w-3/4 md:w-1/2 lg:w-full rounded-md">
      <div className="rounded-full h-32 w-32 border flex items-center justify-center bg-bg0">
        <img
          src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${username}&scale=80`}
          alt={`${username} avatar`}
          className="rounded-full"
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

      <Button
        variant="error"
        size="big"
        text={loading ? "Logging out.." : "Logout"}
        onClick={handleLogoutClick}
        loading={loading}
      />
    </div>
  );
}
