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

  getOrders = async (req, res, next) => {
    try {
      const orders = await this.orderService.getOrders(req.userData.userId);
      res.status(200).send(orders);
    } catch (err) {
      next(err);
    }
  }

  getOrderDetail = async (req, res, next) => {
    try {
      const orderData = await this.orderService.getOrderDetail(req.params.orderId, req.userData.userId);

      res.status(200).send(orderData);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderController;