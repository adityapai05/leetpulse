// components/ui/PerformancePie.tsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type DataItem = { name: string; value: number };

type Props = {
  data: DataItem[];
  colors: string[];
};

export default function PerformancePie({ data, colors }: Props) {
  return (
    <div className="bg-bg1 flex flex-1 flex-col p-4 border-2 border-bg2 rounded-md h-[350px]">
      <div className="text-xl font-bold mb-4">Performance Insights</div>
      {/* Responsive container auto-adjusts to parent size */}
      <ResponsiveContainer width="100%" height="100%">
        {data[0].value !== -1 ? (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="70%"
              dataKey="value"
              stroke="var(--bg-1)"
              label
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
                    <div className="bg-bg2 text-text_primary flex flex-row gap-2 px-4 py-2 rounded border border-text_muted shadow-md">
                      <div>{data.name} submissions</div>
                      <div className="font-semibold">{data.value}%</div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        ) : (
          <div className="flex text-text_muted text-center text-sm">
            You need at least 1 submission to view insights
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
