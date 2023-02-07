const {cartDetail} = require("../models");
const {CustomError} = require("../util/customError.util");

class CartRepository {
    constructor(model) {
        this.model = model;
    }

    createCart = async (userId, count) => {
        try {
            const cartData = await this.model.create({userId, count});

            return cartData;
        } catch (err) {
            throw err;
        }
    };

    getCarts = async (userId) => {
        try {
            const carts = await this.model.findAll({
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
            console.log(this.model);
            const findCart = await this.model.findOne({
                where: {userId: userId},
                raw: true,
            });
            console.log(findCart);
            return findCart;
        } catch (error) {
            error.name = "Database Error";
            console.log(error);
            error.status = 400;
            throw error;
        }
    };

    editCart = async (userId, cartId, productId, count) => {
        // console.log(userId);
        try {
            await this.model.update({count}, {where: {userId, cartId, productId}});
            return {status: 200, success: true, message: "장바구니 정보가 변경되었습니다."};
        } catch (error) {
            error.name = "Database Error";
            // error.message = "요청을 처리하지 못하였습니다.";
            error.status = 400;
            throw error;
        }
    };
}

module.exports = CartRepository;
