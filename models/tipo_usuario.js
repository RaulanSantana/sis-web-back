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
  tableName: 'tipo_usuario',
  timestamps: false
});

Tipo_usuario.hasMany(Usuario, { foreignKey: 'id_tipo_usuario', as: 'usuarios' });


module.exports = Tipo_usuario;  
