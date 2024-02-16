const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Simulação de um banco de dados de lançamentos
let transactions = [];

// Simulação de um banco de dados de usuários
let users = [];

// Função para iniciar o servidor
const startServer = (port) => {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            // Se a porta estiver ocupada, tenta a próxima porta
            console.log(`Porta ${port} está em uso, tentando a próxima porta...`);
            startServer(port + 1);
        } else {
            console.error('Erro ao iniciar o servidor:', err);
        }
    });
};

// Inicia o servidor
startServer(PORT);

// Configura o Express para servir arquivos estáticos do diretório 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para adicionar uma nova transação
app.post('/transactions', (req, res) => {
    const { type, value } = req.body;
    const newTransaction = { type, value };
    transactions.push(newTransaction);
    res.status(201).json({ message: 'Lançamento inserido com sucesso' });
});

// Rota para obter todas as transações
app.get('/transactions', (req, res) => {
    res.status(200).json(transactions);
});

// Rota para excluir uma transação com base no índice
app.delete('/transactions/:index', (req, res) => {
    const { index } = req.params;
    transactions.splice(index, 1);
    res.status(200).json({ message: 'Lançamento excluído com sucesso' });
});

// Rota para lidar com a autenticação do usuário
app.post('/login', (req, res) => {
    // Aqui você deve implementar a lógica de autenticação
    const { username, password } = req.body;
    // Exemplo de lógica de autenticação simples
    if (username === 'admin' && password === 'admin') {
        res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
    }
});

// Rota para lidar com o cadastro de usuários
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    // Verifica se o usuário já existe
    if (users.find(user => user.username === username)) {
        res.status(400).json({ error: 'Nome de usuário já existe' });
    } else {
        // Se o usuário não existir, adiciona ao banco de dados
        users.push({ username, password, email });
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    }
});