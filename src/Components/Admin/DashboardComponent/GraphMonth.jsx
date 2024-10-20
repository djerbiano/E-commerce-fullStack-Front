import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const data = [
  { month: "Jan", count: 2000 },
  { month: "Fev", count: 1900 },
  { month: "Mar", count: 2200 },
  { month: "Avr", count: 2500 },
  { month: "Mai", count: 4200 },
  { month: "Juin", count: 3800 },
  { month: "Juil", count: 5000 },
  { month: "Aout", count: 4000 },
  { month: "Sept", count: 3000 },
  { month: "Oct", count: 2000 },
  { month: "Nov", count: 1900 },
];

function GraphMonth() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");

    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple",
      "pink",
      "brown",
      "gray",
      "cyan",
      "magenta",
    ];

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: data.map((row) => row.month),
        datasets: [
          {
            label: "Chiffre d'affaires",
            data: data.map((row) => row.count),
            backgroundColor: colors,
            borderColor: "white",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2,
        plugins: {
          title: {
            display: true,
            text: "Chiffre d'affaires par mois",
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

export default GraphMonth;
