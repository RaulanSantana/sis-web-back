const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const reservaSala = require('./routes/reservas-sala');
const reservaLabHab = require('./routes/reservas-labhab');
const reservaLabInfo = require('./routes/reservas-labinfo');
const usuarioLogin = require ('./routes/login');
const reservaGerais= require('./routes/reservas-gerais');


const app = express(); 
const port = 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/reservas-sala', reservaSala);
app.use('/reservas-labhab',reservaLabHab);
app.use('/reservas-labinfo',reservaLabInfo);
app.use('/usuario-login', usuarioLogin);
app.use('/reservas-gerais',reservaGerais)



const server = createServer(app);
server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}!`);
});
