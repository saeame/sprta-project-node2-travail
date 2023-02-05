const OrderRepository = require('../repositories/order.repository');
const AddressRepository = require('../repositories/address.repository');
const ProductRepository = require('../repositories/product.repository');
const OrderDetailRepository = require('../repositories/orderDetail.repository');
const { Order, Address, orderDetail, Product, sequelize } = require('../models');
const { CustomError } = require('../util/customError.util');

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

  getOrders = async (userId) => {
    try {
      const [orderData] = await sequelize.query(`
        select
          p.name,
          p.photo,
          p.description,
          p.createdAt
        from
          orderDetail od
          inner join travail.Order as o on od.orderId = o.orderId
          inner join Product p on od.productId = p.ProductId
        where
          o.userId = ${userId};
      `)

      if (orderData.length < 1) {
        throw new CustomError(404, '주문목록이 업습니다.');
      }

      return orderData.map(order=>order);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = OrderService;