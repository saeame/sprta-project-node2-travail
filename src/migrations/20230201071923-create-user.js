"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("User", {
            userId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            phone: {
                allowNull: false,
                unique: true,
                type: Sequelize.INTEGER,
            },
            address: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            admin: {
                allowNull: true,
                type: Sequelize.BOOLEAN,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("User");
    },
};
