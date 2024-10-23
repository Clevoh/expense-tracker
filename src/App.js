// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar"; // Ensure correct folder structure
import Home from "./pages/Home";
import Transactions from "./pages/Transactions"; // Import Transactions page
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  // Initialize state with transactions from localStorage, if available
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // Add a new transaction
  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  // Store transactions in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <TransactionForm addTransaction={addTransaction} />
                <TransactionList transactions={transactions} />
              </>
            }
          />

          {/* Transactions Route */}
          <Route
            path="/transactions"
            element={<Transactions transactions={transactions} />}
          />

          {/* Fallback for Undefined Routes */}
          <Route
            path="*"
            element={
              <div className="text-center mt-5">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
