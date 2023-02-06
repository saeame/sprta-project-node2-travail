const router = require('express').Router();

const authMiddleware = require('../middleware/auth.middleware');
const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

router.post('/', authMiddleware, orderController.createOrder);


module.exports = router;