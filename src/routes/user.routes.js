const UserController = require('../controllers/user.controller');
const router = require('express').Router();
const userController = new UserController();

router.post('/', userController.signup);

module.exports = router;
