const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
    service: "gmail",  
    auth: {
        user: "jacksonfelipeead@gmail.com",  // Substitua pelo seu e-mail
        pass: "bdod aqfz tatg jnfg" // Senha gerada pelo Google App Passwords
    }
});

// Rota para envio de e-mail
app.post("/enviar-email", async (req, res) => {
    const { destinatario, assunto, mensagem, dadosCSV } = req.body;

    if (!destinatario || !dadosCSV) {
        return res.status(400).send("Erro: Destinatário ou dados não informados.");
    }

    try {
        // Configuração do e-mail
        let mailOptions = {
            from: "jacksonfelipeead@gmail.com",
            to: destinatario,
            subject: assunto,
            text: mensagem,
            attachments: [
                { filename: "dados.csv", content: dadosCSV, contentType: "text/csv" }
            ]
        };

        // Envio do e-mail
        await transporter.sendMail(mailOptions);
        res.status(200).send("E-mail enviado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao enviar e-mail: " + error.message);
    }
});



// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
