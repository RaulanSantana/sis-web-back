const Usuario = db.define('usuario', {  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  id_tipo_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Tipo_usuario,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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
  tableName: 'usuario',
  timestamps: false
});


Usuario.belongsTo(Tipo_usuario, { foreignKey: 'tipo_usuario', as: 'tipoUsuario' });

module.exports = { Usuario, Tipo_usuario };