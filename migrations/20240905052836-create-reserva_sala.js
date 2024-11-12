'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reserva_sala', {
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
      id_usuario:{
        type: Sequelize.INTEGER,
        references:{
          key:"id",
          model:{
            tableName: "usuario",
          }
        }
      },
      status: {
        type: Sequelize.INTEGER,  
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reserva_sala');
  }
};
/////