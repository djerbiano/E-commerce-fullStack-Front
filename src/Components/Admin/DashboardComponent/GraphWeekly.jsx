import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const data = [
  { day: " Lundi", count: 50 },
  { day: " Mardi", count: 150 },
  { day: " Mercredi", count: 180 },
  { day: " Jeudi", count: 250 },
  { day: " Vendredi", count: 300 },
  { day: " Samedi", count: 420 },
  { day: " Dimanche", count: 190 },
];

function GraphWeekly() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((row) => row.day),
        datasets: [
          {
            label: "Chiffre d'affaires par jour",
            data: data.map((row) => row.count),
            backgroundColor: "#00800061",
            borderColor: "green",
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

export default GraphWeekly;
