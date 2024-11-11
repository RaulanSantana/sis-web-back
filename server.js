// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./config/router-factory'); // Importa a array de rotas

const app = express();
const port = 8080;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/public/images', express.static(path.join(__dirname, '..', 'public', 'images')));

// Registra todas as rotas usando a array de `router-files.js`
routes.forEach(routeConfig => {
    app.use(routeConfig.path, routeConfig.route);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}!`);
});

module.exports = app;
