class AddressUC {
    constructor(addressRepository) {
      this.AddressRepository = addressRepository
    }
  
    async getAddressByID(id) {
      return await this.AddressRepository.getAddressByID(id)
    }
  }
module.exports = AddressUC