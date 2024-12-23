function TransactionList({ transactions, deleteTransaction }) {
  return (
    <ul className="list-group">
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
  );
}

export default TransactionList;
