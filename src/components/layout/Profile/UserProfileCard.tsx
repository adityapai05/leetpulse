import ValueKeyDisplay from "@/components/ui/ValueKeyDisplay";

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
  return (
    <div className="bg-[radial-gradient(at_top_left,var(--bg-0),var(--bg-1))] flex flex-col gap-4 items-center px-4 py-8 w-1/5 rounded-md">
      <div className="rounded-full h-32 w-32 border"></div>
      <ValueKeyDisplay title={username} value={name} />
      <div className="flex flex-row gap-8">
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
