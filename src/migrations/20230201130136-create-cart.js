"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Cart", {
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
                references: {
                    model: "User",
                    field: "userId",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            },
            productId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            inPaid: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Cart");
    },
};
