const { Address } = require('../models');
const { CustomError } = require('../util/customError.util');
class UserRepository {
  constructor(model) {
    this.model = model;
  }

  signup = async ({ email, hashPassword, phone, salt, name }) => {
    try {
      const createdUser = await this.model.create({ email, password: hashPassword, phone, salt, name });

      return createdUser;
    } catch (err) {
      throw err;
    }
  }

  getUser = async (userId) => {
    try {
      let userData;

      if (userId !== undefined) {
        userData = await this.model.findByPk(userId);
      } else {
        userData = await this.model.findAll();
      }

      if (userData === null) {
        throw new CustomError(400, '해당 유저가 없습니다.');
      }

      return userData;
    } catch (err) {
      throw err;
    }
  }

  findOne = async (email) => {
    try {
      const userData = await this.model.findOne({ where: { email } });

      if (userData === null) {
        throw new CustomError(400, '해당 유저가 없습니다.');
      }

      return userData;
    } catch (err) {
      throw (err);
    }
  }

  updateUser = async (email, password, phone, userId) => {
    try {
      await this.model.update({ email, password, phone }, { where: { userId } });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserRepository;