import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const data = [
  { day: 1, count: 10 },
  { day: 2, count: 36 },
  { day: 3, count: 22 },
  { day: 4, count: 25 },
  { day: 5, count: 42 },
  { day: 6, count: 25 },
  { day: 7, count: 28 },
];

function GraphVisitors() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("myChartt").getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((row) => row.day),
        datasets: [
          {
            label: "Visiteurs par jour",
            data: data.map((row) => row.count),
            backgroundColor: "rgba(97, 215, 255, 0.84)",
            borderColor: "rgba(97, 113, 255, 0.65)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,

        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <div>
      <canvas id="myChartt" width="300" height="300"></canvas>
    </div>
  );
}

export default GraphVisitors;
