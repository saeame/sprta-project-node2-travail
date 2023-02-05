class OrderRepository {
  constructor(model) {
    this.model = model;
  }

  create = async (payment, shipment, userId, addressId) => {
    try {
      const orderData = await this.model.create({ payment, shipment, userId, addressId });

      return orderData;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = OrderRepository;