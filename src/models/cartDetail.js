"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class cartDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ cartDetail, Product, Cart }) {
            cartDetail.belongsTo(Product, {
                foreignKey: 'productId',
                as: 'p',
            });
            cartDetail.belongsTo(Cart, {
                foreignKey: 'cartId',
                as: 'c',
            });
        }
    }
    cartDetail.init(
        {
            cartDetailId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            productId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            cartId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: "cartDetail",
            tableName: "cartDetail",
            timestamps: false,
        }
    );
    return cartDetail;
};
