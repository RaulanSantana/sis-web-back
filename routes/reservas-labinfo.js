const express = require('express');
const router = express.Router();
const Reserva_Labinfo = require('../models/reserva_labinfo');

router.post('/criar', async (req, res) => {
  try {
    console.log(req.body)
    const reserva = await Reserva_Labinfo.create(req.body);
    res.status(201).json(reserva);
  
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    res.status(500).json({ error: 'Erro ao criar reserva' });
  }
});

// Rota para listar todas as reservas 
router.get('/listar', async (req, res) => {
  try {
    const reservas = await Reserva_Labinfo.findAll();

    // Adiciona o nome da tabela a cada reserva
    const reservasComNomeTabela = reservas.map(reserva => {
      return {
        ...reserva.dataValues, // Obtém os dados da reserva
        nome_tabela: 'reserva_labinfo' // Adiciona o nome da tabela
      };
    });

    res.status(200).json(reservasComNomeTabela);
  } catch (error) {
    console.error('Erro ao listar reservas:', error);
    res.status(500).json({ error: 'Erro ao listar reservas' });
  }
});

// Rota para buscar uma reserva por ID
router.get('/pegar/:id', async (req, res) => {
  try {
    const reserva = await Reserva_Labinfo.findByPk(req.params.id);
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

    const reserva = await Reserva_Labinfo.findByPk(req.params.id);
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

router.put('/editar/:id', async (req, res) => {
  try {
    const userId = req.headers.userId;  // O userId deve vir dos cabeçalhos
    const { disciplina, data, turno, software, equipamentos, hora_inicio, hora_fim, observacao, reserva_dia } = req.body;

    const reserva = await Reserva_Labinfo.findByPk(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    // Verifica se a reserva pertence ao usuário logado
    if (reserva.userId !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para alterar esta reserva.' });
    }

    // Atualiza os campos da reserva
    await reserva.update({ disciplina, data, turno, software, equipamentos, hora_inicio, hora_fim, observacao, reserva_dia });

    res.status(200).json(reserva);  // Retorna a reserva atualizada
  } catch (error) {
    console.error('Erro ao editar reserva:', error);
    res.status(500).json({ error: 'Erro ao editar reserva' });
  }
});


// Rota para excluir uma reserva por ID
router.delete('/deletar/:id', async (req, res) => {
  try {
    const userId = req.query.userId; 
   
    const reserva = await Reserva_Labinfo.findByPk(req.params.id);

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

module.exports = router;
