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

  getCarts = async (req, res, next) => {
    try {
      const carts = await this.cartService.getCarts(req.userData.userId);
      
      res.status(200).send(carts);
      // res.status(200).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CartController;