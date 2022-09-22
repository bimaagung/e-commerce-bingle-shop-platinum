const { address } = require('../models');

class AddressRepository {
  constructor() {
    this.AddressModel = address;
  }

  async getAddressByID(id) {
    return await this.AddressModel.findOne({
      where: {
        id,
      },
    });
  }

  async getAllAddress(userId) {
    return await this.AddressModel.findAll({ where: { user_id: userId } });
  }

  async addAddress(reqAddress) {
    return await this.AddressModel.create(reqAddress);
  }

  async updateAddress(id, reqAddress) {
    return await this.AddressModel.update(reqAddress, {
      where: {
        id,
      },
    });
  }

  async deleteAddress(id) {
    return await this.AddressModel.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = AddressRepository;
