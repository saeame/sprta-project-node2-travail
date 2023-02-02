"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order.init(
        {
            orderId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },

            addressId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },

            payment: {
                allowNull: false,
                type: DataTypes.CHAR,
            },
            shipment: {
                allowNull: true,
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            isCancel: {
                allowNull: false,
                type: DataTypes.boolean,
            },
            orderStatus: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            createdAt: {
                allowNull: true,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
