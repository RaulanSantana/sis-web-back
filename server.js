const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const cors = require('cors'); 
const reservasRoute = require('./routes/reservasala'); // Corrigido o caminho

const app = express();
const port = 8080;

// Configuração de middlewares
app.use(cors()); // Habilita o CORS para todas as rotas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Definindo rotas
app.use('/api/v1/reservas', reservasRoute); // Utiliza o router das reservas

// Rota de teste
app.get('/teste', (req, res) => {
  console.log('opa');
  res.send('Hello - World!');
});

// Rota para criar reservas
app.post('/reservas', async (req, res) => {
    const {id, disciplina, tipo_reserva, equipamentos, data, turno, hora_inicio, hora_fim, reserva_dia, observacao } = req.body;

    // Simulando a criação da reserva
    const novaReserva = {
      id,
      disciplina,
      tipo_reserva,
      equipamentos,
      data,
      turno,
      hora_inicio,
      hora_fim,
      reserva_dia,
      observacao,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Nova reserva criada:', novaReserva);
    res.status(201).json(novaReserva);
});

// Iniciando o servidor
const server = createServer(app);
server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}!`);
});
