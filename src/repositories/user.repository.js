const { Address } = require('../models');
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

  getUser = async (userId = undefined) => {
    try {
      let userData;
      userId = 13;
      if (userId !== undefined) {
        userData = this.model.findByPk(userId);
      }

      userData = await this.model.findAll();

      return userData;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserRepository;