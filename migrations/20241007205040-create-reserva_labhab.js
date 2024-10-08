'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reserva_labhab', {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reserva_labhab');
  }
};
