const UserService = require('../services/user.service');

class CustomError extends Error{
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
      const { email, password, confirm, address, phone } = req.body;

      if (password !== confirm) {
        throw new CustomError(400, '비밀번호가 일치하지 않습니다.');
      }

      await this.userService.signup(
        email,
        Password,
        address,
        phone
      );
      
      
    } catch (err) {
      console.log({ err });
      res.status(err.code).send({ message: err.message });
    }
  }
}

module.exports = UserController;