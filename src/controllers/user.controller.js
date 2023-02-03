const UserService = require('../services/user.service');

class UserController {
  userService = new UserService();

  signup = async (req, res,next) => {
    try {
      await this.userService.signup(req.body);
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;