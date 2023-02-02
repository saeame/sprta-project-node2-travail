"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("cartDetail", {
            cartDetailId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            productId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Product",
                    field: "productId",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            },
            cartId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Cart",
                    field: "cartId",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("cartDetail");
    },
};
