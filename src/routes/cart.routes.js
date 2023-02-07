const CartController = require('../controllers/cart.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = require('express').Router();

const cartController = new CartController();

router.post('/', authMiddleware, cartController.createCart);


module.exports = router;