// components/ui/StatsCard.tsx
import Stats from "@/components/ui/Stats";

type StatItem = { title: string; value: string | number };

type Props = {
  heading: string;
  stats: StatItem[];
};

export default function StatsCard({ heading, stats }: Props) {
  return (
    <div className="bg-bg1 flex-1 flex flex-col p-4 gap-8 border-2 border-bg2 rounded-md">
      <div className="text-xl font-bold">{heading}</div>
      <div className="flex flex-col gap-2">
        {stats.map((s, i) => (
          <Stats key={i} title={s.title} value={s.value} />
        ))}
      </div>
    </div>
  );
}
