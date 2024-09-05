'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('organizations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      departmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'departments',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('organizations');
  },
};
