const { Cart, cartDetail } = require('../models');
const CartRepository = require('../repositories/cart.repository');
const CartDetailRepository = require('../repositories/cartDetail.repository');

class CartService {
  cartRepository = new CartRepository(Cart);

  createCart = async (userId, { productId, count }) => {
    try {
      const { cartId } = await this.cartRepository.createCart(userId, count);

      const cartDetailRepository = new CartDetailRepository(cartDetail);
      await cartDetailRepository.create(productId, cartId);

    } catch (err) {
      throw err;
    }
  }

  getCarts = async (userId) => {
    try {
      const carts = await this.cartRepository.getCarts(userId);
      return carts.map(({
        cartId,
        count,
        inPaid,
        cd: [cd],
      }) => {
        return {
          cartId,
          count,
          inPaid,
          productId: cd.productId,
        }          
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CartService;