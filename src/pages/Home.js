// src/pages/Home.js
import ExpenseChart from "../components/ExpenseChart"; // Ensure correct case for the 'components' folder
import './App.css';

function Home({ transactions = [] }) {
  // Calculate the total balance and format to 2 decimal places
  const totalBalance = transactions
    .reduce((sum, t) => sum + t.amount, 0)
    .toFixed(2);

  return (
    <div className="container">
      <h2 className="mt-4">Expense Summary</h2>
      <h4>Total Balance: ${totalBalance}</h4>
      {transactions.length > 0 ? (
        <ExpenseChart transactions={transactions} />
      ) : (
        <p>No transactions available. Start adding some!</p>
      )}
    </div>
  );
}

export default Home;
