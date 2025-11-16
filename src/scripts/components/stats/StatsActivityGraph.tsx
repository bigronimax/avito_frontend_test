import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { ActivityDataResponse } from "../../api/models.api";

const COLORS = ["#52C41A", "#FF4D4F", "#FFA940"];

function StatsActivityGraph({
  activityData,
}: {
  activityData: ActivityDataResponse[];
}) {
  const data = activityData.map((elem) => ({
    date: elem.date,
    Одобрено: elem.approved,
    Отклонено: elem.rejected,
    "На доработке": elem.requestChanges,
  }));

  return (
    <div className="flex flex-col gap-[25px]">
      <h3 className="text-[28px] font-bold">График активности</h3>
      <div className="flex items-center justify-center">
        <BarChart
          style={{
            width: "100%",
            maxHeight: "50vh",
            aspectRatio: 1.5,
          }}
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis width="auto" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Одобрено"
            fill={COLORS[0]}
            activeBar={<Rectangle stroke="black" />}
          />
          <Bar
            dataKey="Отклонено"
            fill={COLORS[1]}
            activeBar={<Rectangle stroke="black" />}
          />
          <Bar
            dataKey="На доработке"
            fill={COLORS[2]}
            activeBar={<Rectangle stroke="black" />}
          />
        </BarChart>
      </div>
    </div>
  );
}

export default StatsActivityGraph;
