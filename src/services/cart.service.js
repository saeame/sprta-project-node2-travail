const {Cart, cartDetail} = require("../models");
const CartRepository = require("../repositories/cart.repository");
const CartDetailRepository = require("../repositories/cartDetail.repository");

class CartService {
    cartRepository = new CartRepository(Cart);

    createCart = async (userId, {productId, count}) => {
        try {
            const {cartId} = await this.cartRepository.createCart(userId, count);

            const cartDetailRepository = new CartDetailRepository(cartDetail);
            await cartDetailRepository.create(productId, cartId);
        } catch (err) {
            throw err;
        }
    };

    getCarts = async (userId) => {
        try {
            const carts = await this.cartRepository.getCarts(userId);
            return carts.map(({cartId, count, inPaid, cd: [cd]}) => {
                return {
                    cartId,
                    count,
                    inPaid,
                    productId: cd.productId,
                };
            });
        } catch (err) {
            throw err;
        }
    };

    // module.exports = CartService;

    // const CartRepository = require("../repositories/cart.repository.js");
    // const {User, Cart} = require("../models/index.js");

    // class CartService {
    //     cartRepository = new CartRepository(User, Cart);

    editCart = async (userId, cartId, productId, count) => {
        try {
            console.log(1);
            console.log(userId, cartId, productId, count);
            const findmyCart = await this.cartRepository.findMyCart(userId, cartId, productId);
            if (!findmyCart) {
                const error = new Error("해당 유저의 장바구니가 존재하지 않습니다.");
                error.name = "Cart Not Found";
                error.status = 400;
                throw error;
            }
            return await this.cartRepository.editCart(userId, cartId, productId, count);
        } catch (error) {
            error;
        }
    };
}
module.exports = CartService;
