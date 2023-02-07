'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Cart', 'productId')
    ]
  },

  async down (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Cart', 'productId', {
        allowNull: true,
        type: Sequelize.INTEGER,
      })
    ]
  }
};
