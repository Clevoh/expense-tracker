// src/pages/Home.js
import ExpenseChart from "../Components/ExpenseChart";

function Home({ transactions }) {
  const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="container">
      <h2 className="mt-4">Expense Summary</h2>
      <h4>Total Balance: ${totalBalance}</h4>
      <ExpenseChart transactions={transactions} />
    </div>
  );
}

export default Home;
