// src/routes/reserva.js
const express = require('express');
const router = express.Router();
const Reserva = require('../models/reserva_sala.js');
const { default: API_BASE_URL } = require('../services/api.js');



router.post(API_BASE_URL + '/reserva_a', async (req, res) => {
    try {
        const reserva = await Reserva.create(req.body); 
        return res.status(201).json(reserva);
    } catch (error) {
        console.error('Erro ao criar reserva:', error);
        return res.status(500).json({ error: 'Erro ao criar reserva' });
    }
});

module.exports = router;