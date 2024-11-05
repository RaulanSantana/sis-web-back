const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario'); 
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'sua-chave-secreta';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: 'Email incorreto.' });
    }

    if (password !== usuario.senha) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    const token = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: '1h' });
    

    
    return res.status(200).json({ 
      message: 'Login bem-sucedido!', 
      token,
      id:usuario.id
    });


    if (response.ok) {
      const token = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({ token, id: usuario.id }); // Retorna o token e o ID do usuário
    }

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
  }
});

module.exports = router;
