const express = require('express');
const router = express.Router();
const Reserva_Labinfo = require('../models/reserva_labinfo');

router.post('/criar', async (req, res) => {
  console.log('Reserva criada com sucesso >>>>>>>>>>>>>>>>>>>>>>>>>');
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
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
  try {
    const reserva = await Reserva_Labinfo.findByPk(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    await reserva.update(req.body);
    res.status(200).json(reserva);
  } catch (error) {
    console.error('Erro ao atualizar reserva:', error);
    res.status(500).json({ error: 'Erro ao atualizar reserva' });
  }
});

// Rota para excluir uma reserva por ID
router.delete('/:id', async (req, res) => {
  try {
    const reserva = await Reserva_Labinfo.findByPk(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
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
