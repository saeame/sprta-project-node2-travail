'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product - Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product - Order.init({
    productId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product-Order',
  });
  return Product - Order;
};