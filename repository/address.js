const { address } = require('../models');

class AddressRepository {
  constructor() {
    this.AddressModel = address;
  }

  async getAddressByID(id) {
    return await this.AddressModel.findOne({
      where: {
        id : id,
      },
    });
  }

  async getAddressByUserID(user_id) {
    return await this.AddressModel.findAll({
      where : {user_id : user_id}
     });
   }

  async addAddress(reqAddress) {
    return await this.AddressModel.create(reqAddress);
  }

  async updateAddress(address, id) {
    return await this.AddressModel.update(address, {
        where: { id: id },
      });
    }
  async getMainAddress(user_id){
    return await this.AddressModel.findOne({
      where : {
        user_id : user_id,
        main_address : true
      }
    })
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