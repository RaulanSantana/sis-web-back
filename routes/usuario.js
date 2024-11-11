const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario'); 


// Rota para buscar um usuario por ID
router.get('/usuario/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }
    res.status(200).json(usuario); // Alterado de reserva para usuario
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});


module.exports = router;
