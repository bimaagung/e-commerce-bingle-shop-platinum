class AddressUC {
  constructor(addressRepository, UserRepository) {
    this.AddressRepository = addressRepository;
    this.UserRepository = UserRepository;
  }

  async getAddressByUserID(userId) {
    let result = {
      isSuccess: false,
      reason: "",
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
      reason: "",
      data: null,
    };

    let existUserById = await this.UserRepository.getUserByID(address.user_id);

    if (existUserById == null) {
      result.reason = "user id not found";
      return result;
    }
    let limitAddress = await this.AddressRepository.getAddressByUserID(
      address.user_id
    );
    if (limitAddress.length === 3) {
      result.reason = "cannot add address, maximal limit";
      result.status = 400;
      return result;
    }
    let main_address = await this.AddressRepository.getMainAddress(
      address.user_id
    );
    if (main_address === null) {
      address = await this.AddressRepository.addAddress(address);
    } else {
      address.main_address = false;
      address = await this.AddressRepository.addAddress(address);
    }

    result.isSuccess = true;
    result.data = address;
    result.status = 201;
    return result;
  }

  async updateAddress(address, id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: "",
      data: null,
    };

    let existAddress = await this.AddressRepository.getAddressByID(id);

    if (existAddress == null) {
      result.reason = "address not found";
      return result;
    }
    let updateAddress = await this.AddressRepository.updateAddress(address, id);
    result.isSuccess = true;
    result.status = 200;
    result.data = updateAddress;
    return result;
  }
  async changeMainAddress(address_id, user_id) {
    let result = {
      isSuccess: false,
      reason: "",
      status: 404,
    };
    let existAddress = await this.AddressRepository.getAddressByID(address_id);
    if (existAddress === null) {
      result.reason = "address not found";
      return result;
    }
    let address = await this.AddressRepository.getMainAddress(user_id);
    if (address === null) {
      result.reason = "customer not have address";
      return result;
    }
    const changeMainAddressToFasle = {
      main_address: false,
    };
    await this.AddressRepository.updateAddress(
      changeMainAddressToFasle,
      address.id
    );

    const newMainAddres = {
      main_address: true,
    };
    await this.AddressRepository.updateAddress(newMainAddres, address_id);

    result.isSuccess = true;
    result.status = 200;
    return result;
  }

  async deleteAddress(id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: "",
      data: null,
    };

    let existAddress = await this.AddressRepository.getAddressByID(id);

    if (existAddress == null) {
      result.reason = "address not found";
      return result;
    }
    if (existAddress.main_address === true) {
      result.reason =
        "cannot delete main address, please change main address first";
      result.status = 400;
      return result;
    }

    let deleteAddress = await this.AddressRepository.deleteAddress(id);

    result.isSuccess = true;
    result.status = 200;
    result.data = deleteAddress;
    return result;
  }
}

module.exports = AddressUC;
