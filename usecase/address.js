class AddressUC {
  constructor(addressRepository) {
    this.AddressRepository = addressRepository;
  }

  async getAllAddress(id) {
    let result = {
      isSuccess: false,
      reason: '',
      data: null,
    };

    let getAllAddress = await this.AddressRepository.getAllAddress(id);

    if (getAllAddress == null) {
      result.reason = 'list is empty';
    };

    result.isSuccess = true;
    result.data = getAllAddress;

    return result;
  }


  async getAllAddress(userId) {
    let result = {
      isSuccess: false,
      reason: '',
      data: null,
    };

    let getAllAddress = await this.AddressRepository.getAllAddress(userId);

    if (getAllAddress == null) {
      result.reason = 'list is empty';
    };

    result.isSuccess = true;
    result.data = getAllAddress;

    return result;
  }

  async addAddress(address) {
    let result = {
      isSuccess: false,
      reason: '',
      data: null,
    };

    let existUserById = await this.UserRepository.getUserById(address.user_id);

    if (existUserById == null) {
      result.reason = 'user id not found';
    };

    // memasukkan address ke database
    let addAddress = await this.AddressRepository.addAddress(address);

    result.isSuccess = true;
    result.data = addAddress;
    return result;
  }

  async updateAddress(id, address) {
    let result = {
      isSuccess: false,
      reason: '',
      data: null,
    };

    let existAddress = await req.addressUC.getAddressByID(id);

    if (existAddress == null) {
      result.reason = 'address id not found';
    };

    let updateAddress = await this.AddressRepository.updateAddress(id, address);

    result.isSuccess = true;
    result.data = updateAddress;
    return result;
  }

  async deleteAddress(id) {
    let result = {
      isSuccess: false,
      reason: '',
      data: null,
    };

    let existAddress = await req.addressUC.getAddressByID(id);

    if (existAddress == null) {
      result.reason = 'address id not found';
    };

    let deleteAddress = await this.AddressRepository.deleteAddress(id);

    result.isSuccess = true;
    result.data = deleteAddress;
    return result;
  }
}
module.exports = AddressUC;
