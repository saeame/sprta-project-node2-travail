const {Product, orderDetail, Order} = require("../models");

class ProductRepository {
    constructor() {
        this.model = Product;
        this.orderDetailModel = orderDetail;
        this.orderModel = Order;
    }

    async getAllProduct() {
        return Product.findAll({
            attributes: ["productId", "name", "photo", "price", "active"],
            order: [["createdAt", "DESC"]],
        });
    }

    async getProduct(productId) {
        return Product.findOne({
            where: {productId},
            attributes: [
                "productId",
                "name",
                "photo",
                "price",
                "description",
                "active",
                "createdAt",
                "updatedAt",
            ],
        });
    }
    async createProduct(name, photo, price, quantity, active, description) {
        await this.model.create({
            name,
            photo,
            price,
            quantity,
            active,
            description,
        });
    }

    async editProduct(productId, orderId, name, photo, price, quantity, active, description) {
        try {
            // 주문상세테이블에서 productId로 해당 상품을 찾아옴.
            // 그 상품의 shipment 값을 확인하여 에러메시지 발생
            const {orderId} = await this.orderDetailModel.findOne({where: {productId}});
            const {shipment} = await this.orderModel.findOne({where: {orderId}});
            if (shipment !== 4) {
                const error = new Error("이미 처리중인 주문이 있어 수정이 불가능한 상품입니다.");
                error.name = "REQUEST NOT ALLOWED";
                error.status = 400;
                throw error;
            }
            await this.model.update(
                {name, photo, price, quantity, active, description},
                {where: productId}
            );
            return {status: 200, success: true, message: "상품 정보가 변경되었습니다."};
        } catch (error) {
            throw error;
        }
    }

    async removeProduct(productId) {
        try {
            const {orderId} = await this.orderDetailModel.findOne({where: {productId}});
            const {shipment} = await this.orderModel.findOne({where: {orderId}});
            if (shipment !== 4) {
                const error = new Error("이미 처리중인 주문이 있어 삭제가 불가능한 상품입니다.");
                error.name = "REQUEST NOT ALLOWED";
                error.status = 400;
                throw error;
            }
            await Product.destroy({where: {productId}});
            return {status: 200, success: true, message: "상품이 삭제되었습니다."};
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ProductRepository;
