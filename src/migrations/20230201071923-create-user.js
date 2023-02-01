"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            userId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            phone: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            address: {
                type: Sequelize.INTEGER,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
