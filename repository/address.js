const { address } = require('../models')

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

  async addAddress() {
    let data = null;
    try {
      data = await this.AddressModel.create(address);
    } catch (err) {
      console.log(err)
      return null
    }
    return data
  };
}

// async putAddress() {
//   return await this.AddressModel.findAll({
//   });
// };

// async deleteAddress() {
//   return await this.AddressModel.findAll({
//   });
// };
module.exports = AddressRepository
