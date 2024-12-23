import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ExpenseChart from "./components/ExpenseChart";
import Transactions from "./pages/Transactions";
import TransactionForm from "./components/TransactionForm";
import './App.css';

function NotFound() {
  return (
    <div className="text-center mt-5">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function App() {
  // State for initial amount (salary)
  const [initialAmount, setInitialAmount] = useState(() => {
    const savedAmount = localStorage.getItem("initialAmount");
    return savedAmount ? parseFloat(savedAmount) : 0; // Default to 0 if no saved value
  });

  // State for transactions
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // State to toggle visibility of balance
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  // Function to toggle balance visibility
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  // Function to add a new transaction
  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  // Function to delete a single transaction
  const deleteTransaction = (indexToRemove) => {
    setTransactions((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Function to clear all transactions
  const clearAllTransactions = () => {
    setTransactions([]);
  };

  // Calculate remaining balance
  const totalExpenditure = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const balance = initialAmount - totalExpenditure;

  // Save initial amount and transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("initialAmount", initialAmount);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [initialAmount, transactions]);

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>
            {isBalanceVisible ? `Balance: $${balance.toFixed(2)}` : "Balance: Hidden"}
          </h3>
          <button
            className="btn btn-secondary"
            onClick={toggleBalanceVisibility}
          >
            {isBalanceVisible ? "Hide Balance" : "View Balance"}
          </button>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="initialAmount" className="form-label">
            Initial Amount (e.g., Salary):
          </label>
          <input
            type="number"
            id="initialAmount"
            className="form-control"
            value={initialAmount}
            onChange={(e) => setInitialAmount(parseFloat(e.target.value) || 0)}
          />
        </div>
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <TransactionForm addTransaction={addTransaction} />
                <ul className="list-group mt-3">
                  {transactions.map((transaction, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                      <span>
                        {transaction.description}: ${transaction.amount}
                      </span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTransaction(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
                {transactions.length > 0 && (
                  <button
                    className="btn btn-danger mt-3"
                    onClick={clearAllTransactions}
                  >
                    Clear All Transactions
                  </button>
                )}
              </>
            }
          />
          {/* Transactions Route */}
          <Route
            path="/transactions"
            element={<Transactions transactions={transactions} />}
          />
          {/* Expense Chart Route */}
          <Route
            path="/expense-tracker"
            element={<ExpenseChart transactions={transactions} />}
          />
          {/* 404 - Page Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
