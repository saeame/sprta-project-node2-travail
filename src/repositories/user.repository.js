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

  getUser = async (userId) => {
    try {
      let userData;

      if (userId !== undefined) {
        userData = await this.model.findByPk(userId);
      } else {
        userData = await this.model.findAll();
      }

      return userData;
    } catch (err) {
      throw err;
    }
  }

  findOne = async (email) => {
    try {
      const userData = await this.model.findOne({ where: { email } });
      
      return userData;
    } catch (err) {
      throw (err);
    }
  }
}

module.exports = UserRepository;