const UserController = require('../controllers/user.controller');
const router = require('express').Router();
const userController = new UserController();

router.push('/', userController.signup);

module.exports = router;
