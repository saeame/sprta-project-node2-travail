"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Address", {
            addressId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            address: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },

            addressName: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
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
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Address");
    },
};
