const ProductService = require('../services/product.service');

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  async getAllProduct(req, res, next) {
    try {
      const productData = await this.productService.getAllProduct();

      res.status(200).json({ productData });
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {
      const { productId } = req.params;
      const data = await this.productService.getProduct(productId);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
