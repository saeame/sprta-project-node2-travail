class OrderDetailRepository {
  constructor(model) {
    this.model = model;
  }

  create = async (productId, orderId, count, totalPrice) => {
    try {
      await this.model.create({ productId, orderId, count, totalPrice });
      
    } catch (err) {
      throw err;
    }
  }
}

module.exports = OrderDetailRepository;