const crypto = require('crypto');
const UserRepository = require('../repositories/user.repository');
const AddressRepository = require('../repositories/address.repository');
const { User, address } = require('../models');

class UserService {
  userRepository = new UserRepository(User);

  signup = async ({ email, password, confirm, phone, address }) => {
    const addressRepository = new AddressRepository(address);
    try{if (password !== confirm) {
      throw new CustomError(400, '비밀번호가 일치하지 않습니다.');
    }

    const salt = createSalt();
    const hashPassword = crypto.createHash('sha512').update(password + salt).digest('base64');

      const createdUser = await this.userRepository.signup({ email, password, phone });
      await this.addressRepository.create(address);
    } catch (err) {
      throw err;
    }

  }
}

  module.exports = UserService;