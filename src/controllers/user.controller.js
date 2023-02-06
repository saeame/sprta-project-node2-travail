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
      let userData = await this.userService.getUser();

      userData = userData.map((user) => {
        return {
          email: user.email,
          name: user.name,
          phone: user.phone,
        }
      })

      res.status(200).send(userData);
    } catch (err) {
      next(err);
    }
  }

  getUserDetail = async (req, res, next) => {
    try {
      const userId = +req.params.userId;
      let userData = await this.userService.getUser(userId);

      res.status(200).send({
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
      })
    } catch (err) {
      next(err);
    }
  }

  updateUser = async (req, res, next) => {
    try {
      await this.userService.updateUser(req.body, req.userData);


      res.status(201).end();
    } catch (err) {
      next(err);
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      const userId = +req.params.userId;
      await this.userService.deleteUser(userId);
      
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  }

  login = async (req, res, next) => {
    try {
      const token = await this.userService.login(req.body);
  
      const MIN = 1 * 1000 * 60;
      const maxAge = 10 * MIN;
  
      res.cookie('jwt', token, { maxAge }).status(200).end();
    } catch (err) {
      next(err);
    }
  }

  logout = async (req, res, next) => {
    try {
      const { userId } = req.userData;
      await this.userService.logout(userId);
      
      res.clearCookie('jwt').status(200).send('logout');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;