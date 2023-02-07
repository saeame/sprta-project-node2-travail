const { cartDetail } = require('../models');
const { CustomError } = require('../util/customError.util');

class CartRepository {
  constructor(model) {
    this.model = model;
  }

  createCart = async (userId, count) => {
    try {
      const cartData = await this.model.create({ userId, count });

      return cartData;
    } catch (err) {
      throw err;
    }
  }

  getCarts = async (userId) => {
    try {
      const carts = await this.model.findAll({
        attributes: [
          'cartId',
          'count',
          'inPaid'
        ],
        include: [
          {
            model: cartDetail,
            as: 'cd',
            attributes: [
              'productId'
            ],
            required: true,
          }
        ],
        where: {
          userId,
          inPaid: false,
        },
      })

      if (carts.length < 1) {
        throw new CustomError(404, '장바구니가 비어있습니다.');
      }
      return carts;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CartRepository;