"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("orderDetail", {
            orderDetailId: {
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
            orderId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Order",
                    field: "orderId",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("orderDetail");
    },
};
