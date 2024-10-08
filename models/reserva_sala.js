const Sequelize = require('sequelize');
const db = require('./db.js');

const Users = db.define('reserva_sala', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  disciplina: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tipo_reserva: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  equipamentos: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  turno: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  hora_inicio: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  hora_fim: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  reserva_dia: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  observacao: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  }
}, {
  // Desativa os timestamps automáticos, pois estamos definindo os campos manualmente
  timestamps: false
});

// Synchronize the model with the database
// Users.sync();

module.exports = Users;
