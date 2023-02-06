const { Product } = require('../models');

class ProductRepository {
  async getAllProduct() {
    return Product.findAll({
      attributes: ['productId', 'name', 'photo', 'price', 'active'],
      order: [['createdAt', 'DESC']],
    });
  }

  async getProduct(productId) {
    return Product.findOne({
      where: { productId },
      attributes: [
        'productId',
        'name',
        'photo',
        'price',
        'description',
        'active',
        'createdAt',
        'updatedAt',
      ],
    });
  }
  async createProduct(name, photo, price, quantity, active, description) {
    await Product.create({
      name,
      photo,
      price,
      quantity,
      active,
      description,
    });
  }

  async removeProduct(productId) {
    try {
      await Product.destroy({ where: { productId } });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProductRepository;
