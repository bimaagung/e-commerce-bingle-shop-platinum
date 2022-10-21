class AddressUC {
  constructor(addressRepository, UserRepository) {
    this.AddressRepository = addressRepository;
    this.UserRepository = UserRepository;
  }

  async getAddressByID(id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: "",
      data: null,
    };
    let address = await this.AddressRepository.getAddressByID(id);

    if (address == null) {
      result.reason = "address not found";
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
    let limitAddress = await this.AddressRepository.getAddressByUserID(address.user_id)
    if(limitAddress.length === 3){
      result.reason = "cannot add address, maximal limit"
      result.status = 400
      return result
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

  // async isMainExist(userId) {
  // let existMainAddress = await this.AddressRepository.getAddressByUserID(userId);
  // let newArray = new Array();
  // for(let i = 0; i < existMainAddress.length; i++) {
  //   if (existMainAddress[i].main_address == true) {
     
  //     return existMainAddress[i]
  //   } 
  // }
  // }

  async updateMainAddress(userId) {
    console.log(userId)
    // let mainAddress = await this.isMainExist(userId);
    let existMainAddress = await this.AddressRepository.getAddressByUserID(userId);
    for(let i = 0; i < existMainAddress.length; i++) {
      if ( existMainAddress[i].main_address) {
        let newAddress = {
          province: existMainAddress[i].province,
        city: existMainAddress[i].city,
        postal_code: existMainAddress[i].postal_code,
        detail: existMainAddress[i].detail,
        user_id: existMainAddress[i].user_id,
        main_address: false
        }
        await this.updateAddress(existMainAddress[i].id, newAddress)
      }
    }

    //  if (mainAddress != null) {
    //   let newAddress = {
    //     province: mainAddress.province,
    //     city: mainAddress.city,
    //     postal_code: mainAddress.postal_code,
    //     detail: mainAddress.detail,
    //     user_id: mainAddress.user_id,
    //     main_address: false
    //   }
    
    //   console.log(newAddress);

    //   let checkStatus = await this.updateAddress(mainAddress.id, newAddress)
    //   console.log(checkStatus)
    //  }
  }

}
module.exports = AddressUC;