const {orderDetail, Product} = require("../models");
const CustomError = require("../util/customError.util");
class OrderRepository {
    constructor(model) {
        this.model = model;
    }

    create = async (payment, shipment, userId, addressId) => {
        try {
            const orderData = await this.model.create({payment, shipment, userId, addressId});
            return orderData;
        } catch (err) {
            throw err;
        }
    };

    getOrders = async (userId) => {
        try {
            const orders = await this.model.findAll({
                include: {
                    model: orderDetail,
                    attributes: ["orderDetailId"],
                    as: "od",
                    required: true,
                    include: {
                        model: Product,
                        attributes: ["name", "photo", "description"],
                        as: "p",
                        required: true,
                    },
                },
                where: {
                    userId,
                },
                attributes: ["orderId", "createdAt", "shipment"],
            });

            if (orders.length < 1) {
                const errtemp = new CustomError(404, "주문목록이 없습니다.");
                throw errtemp;
            }

            return orders;
        } catch (err) {
            throw err;
        }
    };

    deleteOrder = async (orderId) => {
        try {
            const isSuccess = await this.model.destroy({where: {orderId}});

            if (isSuccess < 1) {
                throw new CustomError(404, "주문목록이 없습니다.");
            }
        } catch (err) {
            throw err;
        }
    };
}

module.exports = OrderRepository;
