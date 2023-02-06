'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, orderDetail }) {
      Order.hasMany(orderDetail, {
        foreignKey: 'orderId'
      })
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
        allowNull: true,
        defaultValue: '결제방법 미정',
        type: DataTypes.CHAR,
      },
      shipment: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isCancel: {
        allowNull: true,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'Order',
      timestamps: false,
    }
  );
  return Order;
};
