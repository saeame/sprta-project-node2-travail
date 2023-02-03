const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = require('express').Router();

const userController = new UserController();

router.post('/', userController.signup);
router.get('/', userController.getUser);
router.get('/:userId', userController.getUserDetail);
router.post('/login', userController.login);
router.patch('/:userId', authMiddleware, userController.updateUser);

module.exports = router;
