import React, { useState } from 'react';

const TransactionForm = ({ handleAddTransaction }) => {
  const [type, setType] = useState('income'); // Alterado de 'entrada' para 'income'
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação dos campos
    if (!value.trim()) {
      alert('Por favor, insira um valor.');
      return;
    }
    // Chamada da função para adicionar o lançamento
    handleAddTransaction({ type, value: parseFloat(value) });
    // Limpa os campos após a submissão
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tipo:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Entrada</option> {/* Alterado de 'entrada' para 'income' */}
          <option value="expense">Saída</option> {/* Mantido 'saida' */}
        </select>
      </label>
      <br />
      <label>
        Valor:
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Adicionar Lançamento</button>
    </form>
  );
};

export default TransactionForm;