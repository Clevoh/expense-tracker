import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ transactions }) {
  // Define categories
  const categories = ["Income", "Food", "Entertainment", "Rent"];

  // Prepare data for the Pie chart
  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map((cat) =>
          transactions
            .filter((t) => t.category === cat)
            .reduce((sum, t) => sum + t.amount, 0)
        ),
        backgroundColor: ["#4caf50", "#ff5722", "#2196f3", "#ffc107"], // Colors for each category
      },
    ],
  };

  return (
    <div>
      <h3 className="text-center">Expense Breakdown</h3>
      <Pie data={data} />
    </div>
  );
}

export default ExpenseChart;
