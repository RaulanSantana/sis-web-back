const Sequelize = require('sequelize');
const db = require('./db.js');



const Tipo_usuario= db.define('tipo_usuario', {  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
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

// Tipo_usuario.hasMany(Usuario, { foreignKey: 'id_tipo_suario', as: 'usuarios' });


module.exports = Tipo_usuario;  
