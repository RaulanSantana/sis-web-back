require('dotenv').config(); 

const Sequelize = require('sequelize');

const conexao = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: console.log,
});

conexao.authenticate().then(() => {
    console.log('Conexão efetuada com sucesso');
}).catch((err) => {
    console.error('Erro ao conectar:', err);
});

module.exports = conexao;
