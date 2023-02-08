const {cartDetail} = require("../models");
const {CustomError} = require("../util/customError.util");

class CartRepository {
    constructor(CartModel, CartdetailModel) {
        this.cartModel = CartModel;
        this.cartDetailModel = CartdetailModel;
    }

    createCart = async (userId, count) => {
        try {
            const cartData = await this.cartModel.create({userId, count});

            return cartData;
        } catch (err) {
            throw err;
        }
    };

    getCarts = async (userId) => {
        try {
            const carts = await this.cartModel.findAll({
                attributes: ["cartId", "count", "inPaid"],
                include: [
                    {
                        model: cartDetail,
                        as: "cd",
                        attributes: ["productId"],
                        required: true,
                    },
                ],
                where: {
                    userId,
                    inPaid: false,
                },
            });

            if (carts.length < 1) {
                throw new CustomError(404, "장바구니가 비어있습니다.");
            }
            return carts;
        } catch (err) {
            throw err;
        }
    };

    findMyCart = async (userId, cartId, productId) => {
        try {
            const findCart = await this.cartModel.findOne({
                include: [
                    {
                        model: cartDetail,
                        as: "cd",
                        attributes: ["productId"],
                        required: true,
                    },
                ],

                where: {userId: userId, cartId: cartId},
                raw: true,
            });
            return findCart;
        } catch (error) {
            error.name = "Database Error";
            console.log(error);
            error.status = 400;
            throw error;
        }
    };
}

module.exports = CartRepository;
