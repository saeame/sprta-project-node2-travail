const CartService = require('../services/cart.service');

class CartController{
  cartService = new CartService();

  createCart = async (req, res, next) => {
    try {
      await this.cartService.createCart(req.userData.userId, req.body);
        res.status(201).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CartController;