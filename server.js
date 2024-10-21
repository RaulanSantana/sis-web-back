const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const reservaSala = require('./routes/reservasala');

const app = express();
const port = 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/reservas-sala', reservaSala);



const server = createServer(app);
server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}!`);
});
