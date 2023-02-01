"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addConstraint("User", {
            fields: ["userId"],
            type: "foreign key",
            name: "User_Order_userId_fk",
            references: {
                table: "User",
                feild: "userId",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("Order", "User_Order_userId_fk");
    },
};
