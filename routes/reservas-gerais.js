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


function getReservaModel(nomeTabela) {
  switch (nomeTabela) {
    case 'reserva_sala':
      return Reserva_Sala;
    case 'reserva_labinfo':
      return Reserva_Labinfo;
    case 'reserva_labhab':
      return Reserva_Labhab;
    default:
      return null;
  }
}

router.put('/alterar/:id', async (req, res) => {
  try {
    const userId = req.headers.userid; // O userId deve vir dos cabeçalhos
    const { status, nome_tabela } = req.body; // O status e nome da tabela são passados no corpo da requisição

    if (!nome_tabela) {
      return res.status(400).json({ error: 'O nome da tabela é obrigatório.' });
    }

    console.log('Nome da tabela recebido:', nome_tabela); // Log para verificar o nome da tabela

    // Chama a função que retorna o modelo com base no nome da tabela
    const ReservaModel = getReservaModel(nome_tabela);
    if (!ReservaModel) {
      return res.status(400).json({ error: 'Tabela não encontrada.' });
    }

    // Busca a reserva na tabela correta
    const reserva = await ReservaModel.findByPk(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    // Verifica se o usuário tem permissão para alterar a reserva
    if (reserva.id_usuario !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para alterar esta reserva.' });
    }

    // Atualiza o status da reserva
    await reserva.update({ status });
    res.status(200).json(reserva);
  } catch (error) {
    console.error('Erro ao atualizar reserva:', error);
    res.status(500).json({ error: 'Erro ao atualizar reserva' });
  }
});


module.exports = router;
