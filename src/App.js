// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import TransactionForm from "./Components/TransactionForm";
import TransactionList from "./Components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TransactionForm addTransaction={addTransaction} />
                <TransactionList transactions={transactions} />
              </>
            }
          />
          <Route path="/transactions" element={<Home transactions={transactions} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
