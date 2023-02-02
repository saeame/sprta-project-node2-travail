"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Cart.init(
        {
            cartId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            count: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            productId: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            inPaid: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize,
            modelName: "Cart",
        }
    );
    return Cart;
};
