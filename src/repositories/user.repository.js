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
}

module.exports = UserRepository;