// src/components/ExpenseChart.js
import { Pie } from "react-chartjs-2";

function ExpenseChart({ transactions }) {
  const categories = ["Income", "Food", "Entertainment", "Rent"];
  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map((cat) =>
          transactions
            .filter((t) => t.category === cat)
            .reduce((sum, t) => sum + t.amount, 0)
        ),
        backgroundColor: ["#4caf50", "#ff5722", "#2196f3", "#ffc107"],
      },
    ],
  };

  return <Pie data={data} />;
}

export default ExpenseChart;
