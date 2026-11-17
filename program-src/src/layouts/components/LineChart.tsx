import React from "react";
import type { ChartData } from "chart.js";
import { Line } from "react-chartjs-2";

interface LineChartProps {
  data: ChartData<"line">;
}

export default function LineChart(props: LineChartProps) {
  const { data } = props;

  return (
    <div>
      <Line data={data} />
    </div>
  );
}
