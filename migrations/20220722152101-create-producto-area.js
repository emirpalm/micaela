'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('producto_areas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      producto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
             model: 'productos',
             key: 'id'
        },
      },
      area_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
             model: 'areas',
             key: 'id'
        },
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('producto_areas');
  }
};