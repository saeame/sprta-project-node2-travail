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
}

module.exports = CartRepository;