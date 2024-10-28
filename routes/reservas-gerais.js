const express = require('express');
const router = express.Router();
const Reserva_Labinfo = require('../models/reserva_labinfo');
const Reserva_Sala = require('../models/reserva_sala');


router.get('/listar', async (req, res) => {
    try {
      const reservasSala = await Reserva_Sala.findAll();
      const reservasLabinfo = await Reserva_Labinfo.findAll();
  
      // Adiciona o nome da tabela a cada reserva
      const reservasComNomeTabelaSala = reservasSala.map(reserva => ({
        ...reserva.dataValues,
        nome_tabela: 'reserva_sala' // Identifica a origem dos dados
      }));
  
      const reservasComNomeTabelaLabinfo = reservasLabinfo.map(reserva => ({
        ...reserva.dataValues,
        nome_tabela: 'reserva_labinfo' // Identifica a origem dos dados
      }));
  
      // Combina os dois arrays
      const todasReservas = [...reservasComNomeTabelaSala, ...reservasComNomeTabelaLabinfo];
  
      res.status(200).json(todasReservas);
    } catch (error) {
      console.error('Erro ao listar reservas:', error);
      res.status(500).json({ error: 'Erro ao listar reservas' });
    }
  });
  

module.exports = router;
