"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Carts", {
            cartId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            count: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            productId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            paid: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Carts");
    },
};
