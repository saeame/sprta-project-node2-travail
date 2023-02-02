const { Address } = require('../models');
class UserRepository{
  constructor(model) {
    this.model = model;
  }

  signup = async ({ email, password, confirm, phone }) => {
    try {
      



    } catch (err) {
      throw err;
    }
    
  }

}

module.exports = UserRepository;