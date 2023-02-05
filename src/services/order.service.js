const OrderRepository = require('../repositories/order.repository');
const AddressRepository = require('../repositories/address.repository');
const ProductRepository = require('../repositories/product.repository');
const OrderDetailRepository = require('../repositories/orderDetail.repository');
const { Order, Address, orderDetail, Product } = require('../models');

class OrderService {
  orderRepository = new OrderRepository(Order);

  createOrder = async ({ productId, payment, shipment, count }, { userId }) => {
    try {
      const addressRepository = new AddressRepository(Address);
      // const { addresId } = await addressRepository.getAddress(userId);
      const addressId = 1;

      const orderData = await this.orderRepository.create(payment, shipment, userId, addressId);

      const productRepository = new ProductRepository(Product);
      const productData = await productRepository.getProduct(productId);

      const totalPrice = count * productData.price;

      const orderDetailRepository = new OrderDetailRepository(orderDetail);
      await orderDetailRepository.create(productId, orderData.orderId, count, totalPrice);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = OrderService;