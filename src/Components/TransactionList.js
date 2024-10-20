// src/components/TransactionList.js
function TransactionList({ transactions }) {
    return (
      <div>
        <h4>Transaction List</h4>
        <ul className="list-group">
          {transactions.map((t, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <span>{t.description}</span>
              <span>${t.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default TransactionList;
  