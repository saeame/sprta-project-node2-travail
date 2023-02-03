const crypto = require('crypto');
const UserRepository = require('../repositories/user.repository');
const AddressRepository = require('../repositories/address.repository');
const { CustomError } = require('../routes');
const { User, Address } = require('../models');
require('dotenv').config();

class UserService {
  userRepository = new UserRepository(User);

  signup = async ({ email, password, confirm, phone, address, name }) => {
    try {
      const addressRepository = new AddressRepository(Address);
      if (password !== confirm) {
        const customError = new CustomError(400, '비밀번호가 일치하지 않습니다.');
        throw new CustomError(400, '비밀번호가 일치하지 않습니다.');
      }
      const salt = crypto.randomBytes(64).toString('base64');
      const hashPassword = crypto.pbkdf2Sync(
        password,
        salt,
        +process.env.ITERATIONS,
        +process.env.KEYLEN,
        'sha512'
      )
        .toString('base64');

      const { dataValues: {
        userId,
        name: userName
      } } = await this.userRepository.signup({ email, hashPassword, phone, salt, name });
      await addressRepository.addAddress({ address, name: userName, userId });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;