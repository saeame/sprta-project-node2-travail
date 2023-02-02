const UserController = require('../controllers/user.controller');
const router = require('express').Router();
const userController = new UserController();

router.push('/', userController.singup);

module.exports = router;
