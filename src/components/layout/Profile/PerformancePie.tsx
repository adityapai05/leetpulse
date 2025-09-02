// components/ui/PerformancePie.tsx
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type DataItem = { name: string; value: number };

type Props = {
  data: DataItem[];
  colors: string[];
};

export default function PerformancePie({ data, colors }: Props) {
  return (
    <div className="bg-bg1 flex-1 flex flex-col p-4 border-2 border-bg2 rounded-md">
      <div className="text-xl font-bold">Performance Insights</div>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          dataKey="value"
          stroke="var(--bg-1)"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0];
              return (
                <div className="bg-bg2 text-text-primary flex flex-row gap-2 px-4 py-2 rounded border border-text_muted shadow-md">
                  <div>{data.name + " submissions"}</div>
                  <div className="font-semibold">{data.value}% </div>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </div>
  );
}
