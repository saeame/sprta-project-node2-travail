const { Address } = require('../models');
class UserRepository {
  constructor(model) {
    this.model = model;
  }

  signup = async ({ email, password, phone }) => {
    try {
      const createdUser = await this.model.create({ email, password, phone });

      return createdUser;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserRepository;