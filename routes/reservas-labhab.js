const express = require('express');
const router = express.Router();
const Reserva_LabHab = require('../models/reserva_labhab');

router.post('/criar', async (req, res) => {
  console.log('Reserva criada com sucesso >>>>>>>>>>>>>>>>>>>>>>>>>');
  try {
    console.log(req.body)
    const reserva = await Reserva_LabHab.create(req.body);
    res.status(201).json(reserva);
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    res.status(500).json({ error: 'Erro ao criar reserva' });
  }
});

// Rota para listar todas as reservas (opcional)
router.get('/listar', async (req, res) => {
  try {
    const reservas = await Reserva_LabHab.findAll();
    res.status(200).json(reservas);
  } catch (error) {
    console.error('Erro ao listar reservas:', error);
    res.status(500).json({ error: 'Erro ao listar reservas' });
  }
});

// Rota para buscar uma reserva por ID
router.get('/:id', async (req, res) => {
  try {
    const reserva = await Reserva_LabHab.findByPk(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    res.status(200).json(reserva);
  } catch (error) {
    console.error('Erro ao buscar reserva:', error);
    res.status(500).json({ error: 'Erro ao buscar reserva' });
  }
});

// Rota para atualizar uma reserva por ID
router.put('/alterar/:id', async (req, res) => {
  try {
    const userId = req.headers.userId;  // O userId deve vir dos cabeçalhos
    const { status } = req.body;  // O status deve vir do corpo da requisição

    const reserva = await Reserva_LabHab.findByPk(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    if (reserva.userId !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para alterar esta reserva.' });
    }

    await reserva.update({ status });  // Atualiza o status da reserva
    res.status(200).json(reserva);
  } catch (error) {
    console.error('Erro ao atualizar reserva:', error);
    res.status(500).json({ error: 'Erro ao atualizar reserva' });
  }
});

// Rota para excluir uma reserva por ID
router.delete('/deletar/:id', async (req, res) => {
  try {
    const userId = req.query.userId; 
   
    const reserva = await Reserva_LabHab.findByPk(req.params.id);

    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    // Verifica se a reserva pertence ao usuário logado
    if (reserva.userId !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para excluir esta reserva.' });
    }

    await reserva.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir reserva:', error);
    res.status(500).json({ error: 'Erro ao excluir reserva' });
  }
});

// Rota de teste
router.get('/', (req, res) => {
  res.status(200).send('Hello - World!');
  console.log('opa funcionou teste 2');
});

module.exports = router;
