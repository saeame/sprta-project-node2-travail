'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return [
      queryInterface.changeColumn('Order', 'payment', {
        allowNull: true,
        defaultValue: '결제방법 미정',
        type: Sequelize.CHAR(20),
      }),
      queryInterface.changeColumn('Order','shipment',{
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER(1).UNSIGNED,
      }),
      queryInterface.changeColumn('Order', 'isCancel', {
        allowNull: true,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.changeColumn('Order', 'createdAt', {
        allowNull: true,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      })
    ]
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    return [
      queryInterface.changeColumn('Order', 'payment', {
        allowNull: false,
        type: Sequelize.CHAR,
      }),
      queryInterface.changeColumn('Order','shipment',{
        allowNull: true,
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('Order', 'isCancel', {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.changeColumn('Order', 'createdAt', {
        allowNull: true,
        type: Sequelize.DATE,
      })
    ]
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
