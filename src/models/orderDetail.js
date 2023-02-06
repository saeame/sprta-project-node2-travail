"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class orderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    orderDetail.init(
        {
            orderDetailId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            productId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            orderId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: "orderDetail",
            tableName: "orderDetail",
            timestamps: false
        }
    );
    return orderDetail;
};
