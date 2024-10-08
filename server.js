const express = require('express');
const {createServer}=require("http");
const port = 8080;
const Reservas_a = require('./routes/reservas_a'); 

const app = require("./config/router-factory");


const http = createServer(app);




app.get('/teste', (req, res) => {
  console.log('opa')
  res.send('Hello - World!');
});


app.post('/cadastrar_reserva_a', async (req, res) => {
  try {

    await Reservas_a.create(req.body); 
    return res.json({
      erro: false,
      mensagem: "Dados cadastrados com sucesso"
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro, não cadastrado",
      detalhes: error.message 
    });
  }
});

// Iniciar o servidor
http.listen(port, () => console.log(`Servidor rodando na porta: ${port}!`));
