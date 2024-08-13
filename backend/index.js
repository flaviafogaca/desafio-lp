const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'flavia_fogaca',  // Use o nome de usuário criado
    password: '123fla00',  // Use a senha criada
    database: 'formulario_desafio'
});

// Conexão com o banco de dados
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // ou outro serviço de e-mail
    auth: {
        user: 'flaviagenshinhutao@gmail.com',
        pass: 'zisdvoqvjnulusad'
    }
});

// Rota para receber dados do formulário
app.post('/submit', (req, res) => {
    const { nome, email, idade, regiao, outros, jogos } = req.body;

    // Verifica se jogos é um array, se não, cria um array vazio
    const jogosArray = Array.isArray(jogos) ? jogos : jogos ? [jogos] : [];

    // Ajusta a consulta SQL para a tabela 'inscricoes'
    const query = 'INSERT INTO inscricoes (nome, email, idade, regiao, outros, jogos) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [nome, email, idade, regiao, outros || null, jogosArray.join(',')], (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao salvar os dados.');
            return;
        }

        /*
        // Configuração do e-mail de confirmação
        const mailOptions = {
            from: 'flaviagenshinhutao@gmail.com',
            to: email,
            subject: 'Confirmação de Inscrição',
            text: `Olá ${nome},\n\nRecebemos a sua inscrição para fazer parte da comunidade da FURIA.
              Agradecemos pelo seu interesse em se juntar à nós.\n\nFonte conosco,\nFuria`
        };
        */

        // Caminho para a imagem na pasta frontend
        // Caminho para a imagem SVG na pasta frontend
const imagePath = path.join(__dirname, '..', 'frontend', 'src', 'assets', 'logo_furia.svg');

// Configuração do e-mail com HTML e anexos
const mailOptions = {
    from: 'flaviagenshinhutao@gmail.com',
    to: email,
    subject: 'Confirmação de Inscrição',
    html: `
        <html>
        <head>
            <style>
                .welcome-text {
                    font-size: 16px;
                    color: #333;
                }
                .image {
                    width: 100px;
                    height: auto;
                    border: 1px solid #ddd;
                }
            </style>
        </head>
        <body>
            <p>Olá ${nome},</p>
            <p class="welcome-text">Bem-vindo(a) à comunidade da <strong>FURIA</strong>.</p>
            <p>Gostaríamos de informar que recebemos sua inscrição realizada por meio do e-mail ${email}.</p>
            <p>Para comemorar, estamos te enviando um código promocional de 10% de desconto em toda a loja da furia.gg com validade de 30 dias. Seu cupom é <strong>FURIA10</strong>.</p>
            <p><strong>APROVEITE!</strong></p>
            <img src="cid:logo_furia" alt="Logo da Furia" class="image">
            <p>Conte conosco,<br>Equipe Furia</p>
        </body>
        </html>
    `,
    attachments: [
        {
            filename: 'logo_furia.svg',  // Certifique-se de que o nome do arquivo é correto
            path: imagePath,
            cid: 'logo_furia'  // O CID usado no HTML deve corresponder exatamente
        }
    ]
};

        // Enviar e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erro ao enviar e-mail:', error);
                res.status(500).send('Erro ao enviar e-mail de confirmação');
                return;
            }
            res.send('Dados recebidos com sucesso e e-mail de confirmação enviado!');
        });
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

