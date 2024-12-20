const Sequelize = require('sequelize');
const db = require('./db.js');
const Usuario = require('./usuario'); 

const Reserva_sala = db.define('reserva_sala', {  
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
    type: Sequelize.TIME,
    allowNull: false,
  },
  hora_fim: {
    type: Sequelize.TIME,
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

// Definir a associação
Reserva_sala.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

module.exports = Reserva_sala;
