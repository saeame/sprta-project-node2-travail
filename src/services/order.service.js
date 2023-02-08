const OrderRepository = require("../repositories/order.repository");
const AddressRepository = require("../repositories/address.repository");
const ProductRepository = require("../repositories/product.repository");
const OrderDetailRepository = require("../repositories/orderDetail.repository");
const {Order, Address, orderDetail, Product, sequelize} = require("../models");
const {CustomError} = require("../util/customError.util");

const crypto = require("crypto");

class OrderService {
    orderRepository = new OrderRepository(Order);

    createOrder = async ({productId, payment, shipment, count}, {userId}) => {
        try {
            const addressRepository = new AddressRepository(Address);
            // const { addresId } = await addressRepository.getAddress(userId);
            const addressId = 1;

            const orderData = await this.orderRepository.create(
                payment,
                shipment,
                userId,
                addressId
            );

            const productRepository = new ProductRepository(Product);
            const productData = await productRepository.getProduct(productId);

            const totalPrice = count * productData.price;
            console.log(totalPrice);
            const orderDetailRepository = new OrderDetailRepository(orderDetail);
            await orderDetailRepository.create(productId, orderData.orderId, count, totalPrice);
        } catch (err) {
            throw err;
        }
    };

    getOrders = async (userId) => {
        try {
            // sequelize 활용 조인
            const orders = await this.orderRepository.getOrders(userId);

            return orders.map(({od: [od], createdAt}) => {
                return {
                    orderDetailId: od.orderDetailId,
                    name: od.p.name,
                    photo: od.p.photo,
                    description: od.p.description,
                    createdAt,
                };
            });

            // SQL query 활용 조인
            // const [orders] = await sequelize.query(`
            //   select
            //     p.name,
            //     p.photo,
            //     p.description,
            //     p.createdAt
            //   from
            //     orderDetail od
            //     inner join travail.Order as o on od.orderId = o.orderId
            //     inner join Product p on od.productId = p.ProductId
            //   where
            //     o.userId = ${userId};
            // `)

            // if (orders.length < 1) {
            //   throw new CustomError(404, '주문목록이 없습니다.');
            // }

            // return orders.map(order => order);
        } catch (err) {
            throw err;
        }
    };

    getOrderDetail = async (orderDetailId, userId) => {
        try {
            const orders = await this.orderRepository.getOrders(userId);

            return orders
                .filter(({od: [od]}) => od.orderDetailId === +orderDetailId)
                .map(
                    ({
                        orderId,
                        shipment,
                        od: [od],
                        // createdAt,
                    }) => {
                        return {
                            orderId,
                            name: od.p.name,
                            photo: od.p.photo,
                            description: od.p.description,
                            shipment,
                            // createdAt,
                            // orderDetailId: od.orderDetailId,
                        };
                    }
                );
        } catch (err) {
            throw err;
        }
    };

    deleteOrder = async (orderId, password, userData) => {
        try {
            const salt = userData.salt;
            password = crypto
                .pbkdf2Sync(password, salt, +process.env.ITERATIONS, +process.env.KEYLEN, "sha512")
                .toString("base64");

            // 비밀번호 체크
            if (password !== userData.password) {
                throw new CustomError(400, "비밀번호가 일치하지 않습니다.");
            }

            await this.orderRepository.deleteOrder(orderId);
        } catch (err) {
            throw err;
        }
    };
}

module.exports = OrderService;
