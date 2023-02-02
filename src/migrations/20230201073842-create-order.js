"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Order", {
            orderId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "User",
                    key: "userId",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            },

            addressId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Address",
                    key: "addressId",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            },

            payment: {
                allowNull: false,
                type: Sequelize.CHAR,
            },
            shipment: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            isCancel: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            orderStatus: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Order");
    },
};
