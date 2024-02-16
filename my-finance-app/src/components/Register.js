import React, { useState } from 'react';

const Register = ({ handleRegister, existingUsers }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegisterClick = () => {
    if (username !== '' && password !== '') {
      // Verifica se o nome de usuário já está em uso
      if (existingUsers.includes(username)) {
        setError('Nome de usuário já está em uso.');
      } else {
        handleRegister({ username, password });
      }
    } else {
      setError('Por favor, insira um nome de usuário e senha.');
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegisterClick}>Cadastrar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;