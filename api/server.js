const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/api/submit", async (req, res) => {
  const data = req.body;

  try {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbymCea5jzKvTMSgVU3a5jaOiKqWEsAS9FtTk3gVqe3oyp55r1dqlluVhrxxI4RPtz-6/exec";

    const response = await axios.post(scriptUrl, data, {
      headers: { "Content-Type": "application/json" },
    });

    return res.status(200).json({ message: "Dados enviados com sucesso!", result: response.data });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao enviar dados", error: error.message });
  }
});

module.exports = app;
module.exports.handler = serverless(app); // 🟢 Ponto chave para rodar na Vercel
