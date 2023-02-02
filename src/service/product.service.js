const ProductRepository = require('../repositories/product.repository.js');

class ProductService {
  productRepository = new ProductRepository();

  getAllProduct = async () => {
    try {
      const data = await this.productRepository.getAllProduct();

      return data;
    } catch (error) {
      throw error;
    }
  };

  getProduct = async (productId) => {
    try {
      const data = await this.productRepository.getProduct(productId);

      return data;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = ProductService;
