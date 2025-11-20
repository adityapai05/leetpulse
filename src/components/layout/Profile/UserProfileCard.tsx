import ValueKeyDisplay from "@/components/ui/ValueKeyDisplay";
import { useUser } from "@/context/UserContext";

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
  const user = useUser();
  const username = user?.username || "guest";
  console.log(username);

  return (
    <div className=" flex flex-col gap-4 items-center px-4 py-8 w-full sm:w-3/4 md:w-1/2 lg:w-full rounded-md">
      <div className="rounded-full h-32 w-32 border flex items-center justify-center bg-bg0">
        <img
          src={`https://api.dicebear.com/9.x/shapes/svg?seed=${username}&scale=80`}
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
    </div>
  );
}
