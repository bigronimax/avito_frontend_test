import type { DecisionsDataResponse } from "../../api/models.api";
import { Cell, Pie, PieChart } from "recharts";
import type { PieLabelRenderProps } from "recharts";

const COLORS = ["#52C41A", "#FF4D4F", "#FFA940"];

const renderCustomizedLabel = ({ name, percent }: PieLabelRenderProps) => {
  return `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`;
};

function StatsDecisionsGraph({
  approved,
  rejected,
  requestChanges,
}: DecisionsDataResponse) {
  const data = [
    { name: "Одобрено", value: approved },
    { name: "Отклонено", value: rejected },
    { name: "На доработку", value: requestChanges },
  ];
  return (
    <div>
      <h3 className="text-[28px] font-bold">Распределение решений</h3>
      <div className="flex items-center justify-center">
        <PieChart
          style={{
            width: "100%",
            maxHeight: "50vh",
            aspectRatio: 1,
          }}
          responsive
        >
          <Pie
            data={data}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}

export default StatsDecisionsGraph;
