'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      queryInterface.changeColumn('Cart', 'inPaid', {
        allowNull: true,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      })
    ]
  },

  async down(queryInterface, Sequelize) {
    return [
      queryInterface.changeColumn('Cart', 'inPaid', {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      })
    ]
  }
};
