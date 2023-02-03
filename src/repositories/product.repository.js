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
}

module.exports = ProductRepository;
