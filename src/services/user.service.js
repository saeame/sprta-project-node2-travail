const crypto = require('crypto');
const UserRepository = require('../repositories/user.repository');
const { User } = require('../models');

class UserService {
  userRepository = new UserRepository();

  signup = async (email, password, address, phone) => {
    const salt = createSalt();
    const hashPassword = crypto.createHash('sha512').update(password + salt).digest('base64');
    
  }
}

  module.exports = UserService;