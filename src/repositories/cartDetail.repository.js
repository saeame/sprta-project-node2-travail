const {cartDetail, Cart} = require("../models");
class CartDetailRepository {
    constructor() {
        this.model = cartDetail;
        this.cartModel = Cart;
    }

    create = async (productId, cartId) => {
        try {
            await this.model.create({productId, cartId});
        } catch (err) {
            throw err;
        }
    };

    find = async (userId, productId) => {
        try {
            await this.model.findOne({
                where: {userId, productId},
                raw: true,
            });
            return;
        } catch (error) {
            console.log(error);
            error.name = "Database Error";
            error.status = 400;
            throw error;
        }
    };

    editCart = async (userId, cartId, productId, count) => {
        try {
            const {cartId} = await this.model.findOne({where: {productId}});
            await this.cartModel.update({count}, {where: {cartId}});

            return {status: 200, success: true, message: "수량이 변경되었습니다."};
        } catch (error) {
            error.name = "Database Error";
            // error.message = "요청을 처리하지 못하였습니다.";
            error.status = 400;
            throw error;
        }
    };

    deleteCart = async (userId, cartId, productId) => {
        try {
            const {cartId} = await this.model.findOne({where: {productId}});
            await this.cartModel.destroy({where: {cartId}});
            return {status: 200, success: true, message: "상품이 삭제되었습니다."};
        } catch (error) {
            error.name = "Database Error";
            error.status = 400;
            throw error;
        }
    };
}
module.exports = CartDetailRepository;
