import React, { useState } from 'react';

const TransactionList = ({ transactions, handleDeleteTransaction }) => {
  const [filter, setFilter] = useState('all'); // Estado para armazenar o tipo de filtro selecionado

  const filteredTransactions = filter === 'all' ? transactions : transactions.filter(transaction => transaction.type === filter);

  return (
    <div>
      <h2>Lista de Lançamentos</h2>
      <div>
        <label htmlFor="filter">Filtrar por tipo:</label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todos</option>
          <option value="income">Receita</option>
          <option value="expense">Despesa</option>
        </select>
      </div>
      <ul>
        {filteredTransactions.map((transaction, index) => (
          <li key={index}>
            Tipo: {transaction.type}, Valor: {transaction.value.toFixed(2)}{' '}
            <button onClick={() => handleDeleteTransaction(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;