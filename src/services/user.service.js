const crypto = require('crypto');
const UserRepository = require('../repositories/user.repository');
const AddressRepository = require('../repositories/address.repository');
const { CustomError } = require('../util/customError.util');
const { User, Address } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserService {
  userRepository = new UserRepository(User);

  signup = async ({ email, password, confirm, phone, address, name }) => {
    try {
      if (password !== confirm) {
        throw new CustomError(400, '비밀번호가 일치하지 않습니다.');
      }

      const salt = crypto.randomBytes(64).toString('base64');
      const hashPassword = crypto.pbkdf2Sync(
        password,
        salt,
        +process.env.ITERATIONS,
        +process.env.KEYLEN,
        'sha512'
      ).toString('base64');

      const { dataValues: {
        userId,
        name: userName
      } } = await this.userRepository.signup({ email, hashPassword, phone, salt, name });

      const addressRepository = new AddressRepository(User, Address);
      await addressRepository.createAddress(userId, address, '기본주소', userName);
    } catch (err) {
      throw err;
    }
  }

  getUser = async (userId = undefined) => {
    try {
      const userData = await this.userRepository.getUser(userId);

      return userData;
    } catch (err) {
      throw err;
    }
  }

  updateUser = async ({ email, password, address, phone }, userData) => {
    try {
      const { userId } = userData;

      // 비밀번호 변경시
      if (password !== undefined) {
        const salt = userData.salt;
        password = crypto.pbkdf2Sync(
          password,
          salt,
          +process.env.ITERATIONS,
          +process.env.KEYLEN,
          'sha512'
        ).toString('base64');

        // 비밀번호 체크
        if (password !== userData.password) {
          throw new CustomError(400, '비밀번호가 일치하지 않습니다.');
        }
      }

      await this.userRepository.updateUser(email, password, phone, userId);

      const addressRepository = new AddressRepository(User, Address);
      await addressRepository.editAddress(userId, address, '기본주소', userData.name);
    } catch (err) {
      throw err;
    }
  }

  deleteUser = async (userId) => {
    try {
      await this.userRepository.deleteUser(userId);

    } catch (err) {
      throw err;
    }
  }

  login = async ({ email, password }) => {
    try {
      const userData = await this.userRepository.findOne(email);

      const salt = userData.salt;
      const hashPassword = crypto.pbkdf2Sync(
        password,
        salt,
        +process.env.ITERATIONS,
        +process.env.KEYLEN,
        'sha512'
      ).toString('base64');

      if (userData.password !== hashPassword) {
        throw new CustomError(400, '비밀번호가 일치하지 않습니다.');
      }

      const payload = {
        userId: userData.userId,
      }

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '10m', },
      );

      return token;
    } catch (err) {
      throw err;
    }
  }

  logout = async (userId) => {
    try {
      await this.userRepository.getUser(userId);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;