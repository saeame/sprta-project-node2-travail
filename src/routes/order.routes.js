const router = require('express').Router();

const authMiddleware = require('../middleware/auth.middleware');
const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

// 주문목록조회
router.get('/', authMiddleware, orderController.getOrders);
// 주문작성
router.post('/', authMiddleware, orderController.createOrder);


module.exports = router;