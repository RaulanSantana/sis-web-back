const Sequelize = require('sequelize');
const db = require('./db.js');
const Usuario = require ('./usuario.js')

const Reserva_labhab = db.define('reserva_labhab', {
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
  laboratorio: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pop: {
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
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, 
      key: 'id'
    }
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
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
  freezeTableName: true,
  timestamps: false
});

// Synchronize the model with the database
// Users.sync();
Reserva_labhab.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

module.exports = Reserva_labhab;
