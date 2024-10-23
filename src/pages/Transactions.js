// src/pages/Transactions.js
import React from 'react';

function Transactions({ transactions }) {
  return (
    <div className="container mt-4">
      <h2>All Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions to display.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>${transaction.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Transactions;
