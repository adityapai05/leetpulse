// components/ui/StatsCard.tsx
import Stats from "@/components/ui/Stats";

type StatItem = { title: string; value: string | number };

type Props = {
  heading: string;
  stats: StatItem[];
};

export default function StatsCard({ heading, stats }: Props) {
  const items = [];
  for (let i = 0; i < stats.length; i++) {
    items.push(<Stats key={i} title={stats[i].title} value={stats[i].value} />);
  }
  return (
    <div className="bg-bg1 flex flex-col p-4 gap-8 border-2 border-bg2 rounded-md">
      <div className="text-xl font-bold">{heading}</div>
      <div className="flex flex-col gap-2">{items}</div>
    </div>
  );
}
