const express = require('express');
const router = express.Router();
const Reserva_Labinfo = require('../models/reserva_labinfo');
const Reserva_Sala = require('../models/reserva_sala');
const Reserva_Labhab = require('../models/reserva_labhab');
router.get('/listar', async (req, res) => {
  try {
    const userId = req.query.userId; // Obtém o userId dos parâmetros da URL

    if (!userId) {
      return res.status(400).json({ error: 'userId é obrigatório' });
    }

    const reservasSala = await Reserva_Sala.findAll({
      where: { id_usuario: userId }
    });
    const reservasLabinfo = await Reserva_Labinfo.findAll({
      where: { id_usuario: userId }
    });
    const reservasLabhab = await Reserva_Labhab.findAll({
      where: { id_usuario: userId }
    });

    const reservasComNomeTabelaSala = reservasSala.map(reserva => ({
      ...reserva.dataValues,
      nome_tabela: 'reserva_sala'
    }));

    const reservasComNomeTabelaLabinfo = reservasLabinfo.map(reserva => ({
      ...reserva.dataValues,
      nome_tabela: 'reserva_labinfo'
    }));

    const reservasComNomeTabelaLabhab = reservasLabhab.map(reserva => ({
      ...reserva.dataValues,
      nome_tabela: 'reserva_labhab'
    }));

    const todasReservas = [...reservasComNomeTabelaSala, ...reservasComNomeTabelaLabinfo,...reservasComNomeTabelaLabhab];

    res.status(200).json(todasReservas);
  } catch (error) {
    console.error('Erro ao listar reservas:', error);
    res.status(500).json({ error: 'Erro ao listar reservas' });
  }
});


module.exports = router;
