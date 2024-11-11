'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuario', [
      {
        id: 1,
        email: 'administrador@email.com',
        senha: '123456',
        id_tipo_usuario: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'usuario@email.com',
        senha: '123456',
        id_tipo_usuario: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
     
    ], {});
  },
  

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuario', null, {});
  }
};
