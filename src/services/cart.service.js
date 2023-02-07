const {Cart, cartDetail} = require("../models");
const CartRepository = require("../repositories/cart.repository");
const CartDetailRepository = require("../repositories/cartDetail.repository");

class CartService {
    cartRepository = new CartRepository(Cart);
    cartDetailRepository = new CartDetailRepository(Cart);
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

    editCart = async (cartId, userId, productId, count) => {
        try {
            await this.cartDetailRepository.editCart(cartId, userId, productId, count);
        } catch (error) {
            error.name = "Cart Not Found";
            error.status = 400;
            error.message = "처리할 장바구니 내역이 존재하지 않습니다.";
            throw error;
        }
    };

    deleteCart = async (cartId, userId, productId) => {
        console.log(userId);
        try {
            await this.cartDetailRepository.deleteCart(cartId, userId, productId);
        } catch (error) {
            error.name = "Product Not Found";
            error.status = 400;
            error.message = "삭제할 상품이 존재하지 않습니다.";
            throw error;
        }
    };
}
module.exports = CartService;
