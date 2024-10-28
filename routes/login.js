const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario'); 


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const usuario = await Usuario.findOne({ where: { email } });

   
    if (!usuario) {
      return res.status(401).json({ message: 'email incorreto.' });
    }

    if (password !== usuario.senha) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }


    return res.status(200).json({ message: 'Login bem-sucedido!' });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
  }
});

module.exports = router;
