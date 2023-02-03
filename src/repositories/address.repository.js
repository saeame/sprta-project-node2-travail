class AddressRepository {
  constructor(model) {
    this.model = model;
  }

  addAddress = async ({ address, addressName, name, userId }) => {
    try {
      await this.model.create({address, addressName, name, userId});
    } catch (err) {
      throw err
    }
  }
}

module.exports = AddressRepository;