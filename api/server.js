const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// POST endpoint para receber do frontend
app.post("/submit", async (req, res) => {
  const data = req.body;

  try {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbymCea5jzKvTMSgVU3a5jaOiKqWEsAS9FtTk3gVqe3oyp55r1dqlluVhrxxI4RPtz-6/exec"; // 🔁 Substitua

    const response = await axios.post(scriptUrl, data, {
      headers: { "Content-Type": "application/json" },
    });

    return res.status(200).json({ message: "Dados enviados com sucesso!", result: response.data });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao enviar dados", error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});