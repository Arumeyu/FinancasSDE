import React from 'react';

const Dashboard = ({ isLoggedIn, entries, exits, handleAddNewTransaction }) => {
  // Verifica se entries e exits são arrays válidas antes de usar reduce
  const totalEntries = entries && entries.length > 0 ? entries.reduce((acc, entry) => acc + entry.value, 0) : 0;
  const totalExits = exits && exits.length > 0 ? exits.reduce((acc, exit) => acc + exit.value, 0) : 0;

  return (
    <div>
      <h2>Dashboard</h2>
      {isLoggedIn ? (
        <div>
          <p>Total de Entradas: R${totalEntries.toFixed(2)}</p>
          <p>Total de Saídas: R${totalExits.toFixed(2)}</p>
          <button onClick={handleAddNewTransaction}>Adicionar Novo Lançamento</button>
        </div>
      ) : (
        <p>Você precisa estar logado para acessar o Dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
