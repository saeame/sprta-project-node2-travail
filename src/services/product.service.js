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
  async createProduct(name, photo, price, quantity, active, description) {
    await this.productRepository.createProduct(
      name,
      photo,
      price,
      quantity,
      active,
      description
    );

    return;
  }

  async removeProduct(productId) {
    try {
      await this.productRepository.removeProduct(productId);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProductService;
