"use client";
import { useEffect, useState } from "react";
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
import { LoadingSkeleton } from "../../shared/Spinner";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

function LineChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch("/api/subscribers");
        const { success, subscribers } = await response.json(); // Assuming the API returns { success, subscribers }

        if (!success) throw new Error("Failed to fetch subscribers data");

        // Group subscribers by month and year
        const monthlyCounts = {};
        subscribers.forEach(({ subscribedAt }) => {
          const date = new Date(subscribedAt);
          const monthYear = `${date.toLocaleString("default", {
            month: "long",
          })} ${date.getFullYear()}`; // e.g., "January 2024"
          monthlyCounts[monthYear] = (monthlyCounts[monthYear] || 0) + 1;
        });

        // Ensure months and years are ordered chronologically
        const sortedKeys = Object.keys(monthlyCounts).sort(
          (a, b) => new Date(a) - new Date(b)
        );
        const counts = sortedKeys.map((key) => monthlyCounts[key]);

        setChartData({
          labels: sortedKeys,
          datasets: [
            {
              label: "Subscribers Growth",
              data: counts,
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
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setError("Failed to load chart data. Please try again later.");
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const options = {
    plugins: {
      legend: { display: true },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 10,
          font: {
            size: 14,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Subscribers",
          padding: { bottom: 10 },
          font: { size: 16, style: "italic", family: "Arial" },
        },
        beginAtZero: true,
      },
      x: {
        ticks: {
          font: { size: 14, weight: "bold" },
        },
        title: {
          display: true,
          text: "Month and Year",
          padding: { top: 10 },
          font: { size: 16, style: "italic", family: "Arial" },
        },
      },
    },
  };

  if (loading)
    return (
      <p>
        <LoadingSkeleton />
      </p>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-hidden">
      <h1 className="font-bold text-lg md:text-3xl text-center mt-6 max-w-[330px]">
        Subscribers Growth Over Time
      </h1>
      <div className=" w-[900px] h-[550px] md:p-2 cursor-pointer">
        {chartData && <Line data={chartData} options={options} />}
      </div>
    </div>
  );
}

export default LineChart;
