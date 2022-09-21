class AddressUC {
  constructor(addressRepository) {
    this.AddressRepository = addressRepository;
  }

  async getAddressByID(id) {
    return await this.AddressRepository.getAddressByID(id);
  }

  async getAllAddress(userId) {
    return await this.AddressRepository.getAllAddress(userId);
  }

  async addAddress(address) {
    return await this.AddressRepository.addAddress(address);
  }

  async updateAddress(id, address) {
    return await this.AddressRepository.updateAddress(id, address);
  }

  async deleteAddress(id) {
    return await this.AddressRepository.deleteAddress(id);
  }
}
module.exports = AddressUC;
