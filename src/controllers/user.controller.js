const UserService = require('../services/user.service');

class UserController {
  userService = new UserService();

  signup = async (req, res, next) => {
    try {
      await this.userService.signup(req.body);
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  }

  getUser = async (req, res, next) => {
    try {
      const userData = await this.userService.getUser();
      const allUser = userData.map((user) => {
        return {
          email: user.email,
          name: user.name,
          phone: user.phone,
        }
      })
      console.log(allUser);
      res.status(200).send(allUser);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;