const UserService = require('../services/user.service');

class CustomError extends Error {
  code = 0
  message = ''

  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}

class UserController {
  userService = new UserService();

  signup = async (req, res) => {
    try {
      await this.userService.signup(req.body);
      res.status(201).end();
    } catch (err) {
      console.log({ err });
      res.status(err.code).send({ message: err.message });
    }
  }
}

module.exports = UserController;