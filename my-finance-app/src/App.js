import React, { useState, useEffect, useCallback } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import './App.css'; // Importando estilos CSS

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isRegistered, setIsRegistered] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const PORT = process.env.PORT || 3000;

  const handleLogin = async (userData) => {
    try {
      const response = await fetch(`http://localhost:${PORT}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(userData);
        setIsLoggedIn(true);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const handleRegister = async () => {
    // Adicione a lógica para enviar os dados do usuário para o backend
    const userData = { username, password, email };
    try {
      const response = await fetch(`http://localhost:${PORT}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        setIsRegistered(true); // Defina como registrado se o cadastro for bem-sucedido
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Erro ao fazer registro:', error);
    }
  };


  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await fetch(`http://localhost:${PORT}/transactions`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
      const data = await response.json();
      alert(data.message);
      fetchTransactions();
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    }
  };

  const handleDeleteTransaction = async (index) => {
    try {
      const response = await fetch(`http://localhost:${PORT}/transactions/${index}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      alert(data.message);
      fetchTransactions();
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
    }
  };

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:${PORT}/transactions`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Erro ao obter transações:', error);
    }
  }, [PORT]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTransactions();
    }
  }, [isLoggedIn, fetchTransactions]);

  return (
    <div className="App">
      <nav>
        {isLoggedIn && (
          <button onClick={handleLogout}>Sair</button>
        )}
      </nav>

      {!isLoggedIn ? (
        isRegistered ? (
          <Login handleLogin={handleLogin} />
        ) : (
          <div className="register-form">
            <h2>Cadastro</h2>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button className="register-button" onClick={handleRegister}>Cadastrar</button>
            </div>
          </div>
        )
      ) : (
        <div>
          <Dashboard
            user={user}
            transactions={transactions}
            handleLogout={handleLogout}
          />
          <TransactionForm handleAddTransaction={handleAddTransaction} />
          <TransactionList
            transactions={transactions}
            handleDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      )}
    </div>
  );
}

export default App;