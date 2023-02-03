const ProductService = require('../services/product.service');

class ProductController {
  productService = new ProductService();

  getAllProduct = async (req, res, next) => {
    const products = await this.productService.getAllProduct();
    res.status(200).json({ products });
  };

  getProduct = async (req, res, next) => {
    try {
      let { productId } = req.params;
      const productDetail = await this.productService.getProduct(productId);
      res.json({ data: productDetail });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ProductController;
