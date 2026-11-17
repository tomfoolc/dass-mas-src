import React from "react";
import type { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";

interface BarChartProps {
  data: ChartData<"bar">;
}

export default function BarChart(props: BarChartProps) {
  const { data } = props;

  return (
    <div>
      <Bar data={data} />
    </div>
  );
}
