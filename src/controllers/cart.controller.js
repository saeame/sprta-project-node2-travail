const CartService = require("../services/cart.service");

class CartController {
    cartService = new CartService();

    createCart = async (req, res, next) => {
        try {
            await this.cartService.createCart(req.userData.userId, req.body);
            res.status(201).end();
        } catch (err) {
            next(err);
        }
    };

    getCarts = async (req, res, next) => {
        try {
            const carts = await this.cartService.getCarts(req.userData.userId);

            res.status(200).send(carts);
            // res.status(200).end();
        } catch (err) {
            next(err);
        }
    };

    // 장바구니 수정
    editCart = async (req, res) => {
        try {
            const {userId, cartId} = req.params;
            const {productId, count} = req.body;
            const editCartResult = await this.cartService.editCart(
                userId,
                cartId,
                productId,
                count
            );
            return res.status(200).json({editCartResult});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    };
}

module.exports = CartController;
