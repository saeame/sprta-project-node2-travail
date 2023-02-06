const OrderService = require('../services/order.service');

class OrderController {
  orderService = new OrderService();

  createOrder = async (req, res, next) => {
    try {
      await this.orderService.createOrder(req.body, req.userData);

      res.status(201).end()
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderController;