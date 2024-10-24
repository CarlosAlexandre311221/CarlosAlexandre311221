



const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configuração do middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Para servir arquivos estáticos

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha',
    database: 'futebol_db'
});

// Conecta ao banco de dados
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

// Rota para o envio do formulário de contato
app.post('/api/contato', (req, res) => {
    const { nome, email, mensagem } = req.body;
    const sql = 'INSERT INTO contato (nome, email, mensagem) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, mensagem], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao salvar a mensagem' });
        } else {
            res.status(200).json({ message: 'Mensagem salva com sucesso' });
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
