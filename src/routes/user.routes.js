const UserController = require('../controllers/user.controller');
const router = require('express').Router();

const userController = new UserController();

router.post('/', userController.signup);
router.get('/', userController.getUser);
router.get('/:userId', userController.getUserDetail);
router.post('/login', userController.login);

module.exports = router;
