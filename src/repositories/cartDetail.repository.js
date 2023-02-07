class CartDetailRepository{
  constructor(model) {
    this.model = model
  }

  create = async (productId, cartId) => {
    try {
      await this.model.create({ productId, cartId });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CartDetailRepository;