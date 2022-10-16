class AddressUC {
  constructor(addressRepository, UserRepository) {
    this.AddressRepository = addressRepository;
    this.UserRepository = UserRepository;
  }

  async getAddressByID(id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: null,
    };
    let address = await this.AddressRepository.getAddressByID(id);

    if (address == null) {
      result.reason = 'address not found';
      return result;
    }

    result.isSuccess = true;
    result.status = 200;
    result.data = address;
    return result;
  }

  async getAddressByUserID(userId) {
    let result = {
      isSuccess: false,
      reason: '',
      data: [],
    };

    let address = await this.AddressRepository.getAddressByUserID(userId);
    result.isSuccess = true;
    result.status = 200;
    result.data = address;
    return result;
  }

  async addAddress(address) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: null,
    };

    let existUserById = await this.UserRepository.getUserByID(address.user_id);

    if (existUserById == null) {
      result.reason = 'user id not found';
      return result;
    }
    let addAddress = await this.AddressRepository.addAddress(address);

    result.isSuccess = true;
    result.data = addAddress;
    result.status = 201;
    return result;
  }

  async updateAddress(id, address) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: null,
    };

    let existAddress = await this.AddressRepository.getAddressByID(id);

    if (existAddress == null) {
      result.reason = 'address not found';
      return result;
    }
    let updateAddress = await this.AddressRepository.updateAddress(id, address);
    result.isSuccess = true;
    result.status = 200;
    result.data = updateAddress;
    return result;
  }

  async deleteAddress(id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: null,
    };

    let existAddress = await this.AddressRepository.getAddressByID(id);

    if (existAddress == null) {
      result.reason = 'address not found';
      return result;
    }

    let deleteAddress = await this.AddressRepository.deleteAddress(id);

    result.isSuccess = true;
    result.status = 200;
    result.data = deleteAddress;
    return result;
  }

  async isMainExist(userId) {
  let existMainAddress = await this.AddressRepository.getAddressByUserID(userId);
  let newArray = new Array();
  for(let i = 0; i < existMainAddress.length; i++) {
    if (existMainAddress[i].main_address == true) {
     
      return existMainAddress[i]
    } 
  }
  }

  async updateMainAddress(userId) {
    console.log(userId)
     let mainAddress = await this.isMainExist(userId);
     if (mainAddress != null) {
      mainAddress.main_address = false;
      console.log(mainAddress.id);

      let checkStatus = await this.updateAddress(mainAddress.id, mainAddress)
      console.log(checkStatus)
     }
  }

}
module.exports = AddressUC;
