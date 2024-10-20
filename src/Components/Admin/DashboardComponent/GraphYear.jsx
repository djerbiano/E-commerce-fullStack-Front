import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const data = [
  { year: 2010, count: 20000 },
  { year: 2011, count: 19000 },
  { year: 2012, count: 22000 },
  { year: 2013, count: 25000 },
  { year: 2014, count: 42000 },
  { year: 2015, count: 38000 },
  { year: 2016, count: 50000 },
];
function GraphYear() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Chiffre d'affaires par an",
            data: data.map((row) => row.count),
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1,
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
      <canvas id="myChart" width="500" height="250"></canvas>
    </div>
  );
}

export default GraphYear;
