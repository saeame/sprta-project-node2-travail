const ProductService = require('../services/product.service.js');

class ProductController {
  productService = new ProductService();

  getAllProduct = async (req, res, next) => {
    try {
      const data = await this.productService.getAllProduct();

      res.status(200).json({ data });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };

  getProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const data = await this.productService.getProduct(productId);

      res.status(200).json({ data });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };
}

module.exports = ProductController;
