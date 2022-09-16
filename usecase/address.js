class AddressUC {
    constructor(addressRepository) {
      this.AddressRepository = addressRepository
    };
  
    async getAddressByID(id) {
      return await this.AddressRepository.getAddressByID(id)
    };

    async getAllAddress() {
      return await this.AddressRepository.getAllAddress()
    };

    async addAddress() {
      return await this.AddressRepository.addAddress()
    };

    async putAddress(id) {
      return await this.AddressRepository.editAddress(id)
    };

    async deleteAddress(id) {
      return await this.AddressRepository.deleteAddress(id)
    };
  }
module.exports = AddressUC