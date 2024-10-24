// JavaScript para manipular a lista de jogadores
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('listaJogadores')) {
        carregarJogadores();
    }

    // Manipulação do formulário de contato
    const form = document.getElementById('formContato');
    if (form) {
        form.addEventListener('submit', enviarFormulario);
    }
});

// Função para carregar jogadores (exemplo fictício)
function carregarJogadores() {
    const jogadores = [
        { nome: 'Ademilton Silva', posicao: 'Fixo' },
        { nome: 'Franciel Santos', posicao: 'Ala' },
        { nome: 'Carlos Alexandre', posicao: 'Goleiro' },
        { nome: 'Edson Rocha', posicao: 'Ala' },
        {nome: 'Marcelo Tripla' , posicao: 'Pivo'},
        {nome: 'juninho tubarao', posicao: 'Goleiro' },
        {nome: 'kynho lima', posicao: 'Pivo'  },
        {nome: 'keciinho', posicao: 'Ala'},
        {nome: 'Alex Timotio' , posicao: 'Ala'},
        {nome: 'Lucas Silva' , posicao:'Fixo' },
        {nome: 'Dinho Farias', posicao: 'Fixo'}
        
        
    ];

    const listaJogadores = document.getElementById('listaJogadores');
    jogadores.forEach(jogador => {
        const li = document.createElement('li');
        li.textContent = `${jogador.nome} - ${jogador.posicao}`;
        listaJogadores.appendChild(li);
    });
}

// Função para enviar o formulário via AJAX
function enviarFormulario(event) {
    event.preventDefault();

    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        mensagem: document.getElementById('mensagem').value
    };

    fetch('/api/contato', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').textContent = 'Mensagem enviada com sucesso!';
        form.reset(); // Limpa o formulário
    })
    .catch(error => {
        document.getElementById('resultado').textContent = 'Ocorreu um erro. Tente novamente mais tarde.';
    });
}



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
