import React, { useState } from 'react';
import '../App.css'; // Importa o arquivo de estilos CSS

const Login = ({ handleLogin, handleToggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginClick = () => {

    if (username !== '' && password !== '') {
      handleLogin({ username, password });
    } else {
      setError('Por favor, insira um nome de usuário e senha.');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="form-box">
          <h2>Login</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="button-group">
            <button onClick={handleLoginClick} className="submit-button">
              Entrar
            </button>
            <button onClick={handleToggleForm} className="register-button">
              Cadastrar
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;