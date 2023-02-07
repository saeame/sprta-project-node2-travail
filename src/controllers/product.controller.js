const ProductService = require('../services/product.service');

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

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
  createProduct = async (req, res) => {
    const { name, photo, price, quantity, active, description } = req.body;

    await this.productService.createProduct(
      name,
      photo,
      price,
      quantity,
      active,
      description
    );

    res.status(201).json({ message: '상품이 정상적으로 등록되었습니다.' });
  };
  updateProduct = async (req, res) => {
    const productId = +req.params.productId;
    await this.productService.updateProduct(productId);
    return;
  };

  removeProduct = async (req, res, next) => {
    try {
      const productId = +req.params.productId;
      await this.productService.removeProduct(productId);

      res.status(200).json({ message: '상품이 정상적으로 삭제되었습니다.' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ProductController;
