// const product = require('../controller/product');
const { address } = require('../models');

class AddressRepository {
  constructor() {
    this.AddressModel = address
  };

  async getAddressByID(id) {
    let data = null
    try {
      data = await this.AddressModel.findOne({
        where: {
          id: id,
        }
      });
    } catch (err) {
      console.log(err);
      return null;
    };
    return data
  };

  async getAllAddress() {
    let data = null;
    try {
      data = await this.AddressModel.findAll()
    } catch (err) {
      console.log(err);
      return null;
    }
    return data;
  };

  async addAddress(address) {
    let data = null;
    try {
      data = await this.AddressModel.create(address);
    } catch (err) {
      console.log(err);
      return null;
    }
    return data;
  };

  async updateAddress(id, address) {
    let data = null;
    try {
      data = await this.AddressModel.update(address, {
        where: {
          id: id,
        },
      })
    } catch (err) {
      console.log(err);
      return null;
    }
    return data;
  };

  async deleteAddress(id) {
    let data = null
    try {
      data = await this.AddressModel.destroy({
        where: {
          id: id,
        },
      })
    } catch (err) {
      console.log(err);
      return null;
    }
    return data;
  };
}


module.exports = AddressRepository
