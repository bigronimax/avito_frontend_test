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
import type { CategoriesChartResponse } from "../../api/models.api";

function StatsCategoriesGraph({ categoriesData }: CategoriesChartResponse) {
  const data = Object.entries(categoriesData).map(([key, value]) => ({
    name: key,
    Проверенные: value,
  }));

  return (
    <div className="flex flex-col gap-[25px]">
      <h3 className="text-[28px] font-bold">График по категориям</h3>
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
          <XAxis dataKey="name" />
          <YAxis width="auto" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Проверенные"
            fill="#52C41A"
            activeBar={<Rectangle stroke="black" />}
          />
        </BarChart>
      </div>
    </div>
  );
}

export default StatsCategoriesGraph;
