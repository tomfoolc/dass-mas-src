import React from "react";
import type { ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";

interface PieChartProps {
  data: ChartData<"pie">;
}

export default function PieChart(props: PieChartProps) {
  const { data } = props;

  return (
    <div>
      <Pie data={data} />
    </div>
  );
}
