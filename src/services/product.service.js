const ProductRepository = require('../repositories/product.repository');

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProduct() {
    try {
      const data = await this.productRepository.getAllProduct();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getProduct(productId) {
    try {
      const data = await this.productRepository.getProduct(productId);

      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductService;
