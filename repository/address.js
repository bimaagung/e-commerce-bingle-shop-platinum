const {address} = require('../models')

class AddressRepository {
  constructor() {
    this.AddressModel = address
  }

  async getAddressByID(id) {
    let data = null
    try {
      data = await this.AddressModel.findOne({
        where: {
          id: id,
        },
      })
    } catch (err) {
      console.log(err)
      return null
    }
    return data
  }

}
  module.exports = AddressRepository
