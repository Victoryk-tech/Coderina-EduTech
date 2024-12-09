"use client";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

const subscribersData = [
  { month: "January", subscribers: 14 },
  { month: "February", subscribers: 5 },
  { month: "March", subscribers: 8 },
  { month: "April", subscribers: 2 },
  { month: "May", subscribers: 18 },
  { month: "June", subscribers: 50 },
  { month: "July", subscribers: 25 },
  { month: "August", subscribers: 30 },
  { month: "September", subscribers: 1 },
  { month: "October", subscribers: 10 },
  { month: "November", subscribers: 15 },
  { month: "December", subscribers: 12 },
];

function LineChart() {
  const data = {
    labels: subscribersData.map((data) => data.month),
    datasets: [
      {
        label: "Subscription",
        data: subscribersData.map((data) => data.subscribers),
        borderColor: "#6e90e6",
        borderWidth: 1,
        pointBorderColor: "#6e90e6",
        pointBorderWidth: 2,
        tension: 0.5,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#6e90e6");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 2,
          font: {
            size: 17,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Subscribers",
          padding: {
            bottom: 10,
          },
          font: {
            size: 30,
            style: "italic",
            family: "Arial",
          },
        },
        min: 0,
        max: 30,
      },
      x: {
        ticks: {
          font: {
            size: 17,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Month",
          padding: {
            top: 10,
          },
          font: {
            size: 30,
            style: "italic",
            family: "Arial",
          },
        },
      },
    },
  };

  return (
    <div>
      <h1 className="font-bold text-3xl text-center mt-6">
        Subscribers Growth Overtime
      </h1>
      <div
        style={{
          width: "1000px",
          height: "550px",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
}

export default LineChart;
