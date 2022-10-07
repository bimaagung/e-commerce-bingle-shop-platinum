const bcrypt = require("bcrypt");

class UserUC {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async register(user_data) {
    let is_success = false;
    let user = null;
    if (
      typeof user_data.password !== 'string'
      || typeof user_data.username !== 'string'
      || typeof user_data.email !== 'string'
    ) {
      return return_data;
    }
    user = await this.UserRepository.getUserExist(
      user_data.username,
      user_data.email,
    );
    if (user !== null) {
      return {
        is_success,
        user,
        message: 'username or email not aviable',
      };
    }
    user = await this.UserRepository.registerUser(user_data);
    if (user == null) {
      return {
        is_success,
        user,
        message: 'internal server error',
      };
    }
    is_success = true;
    return {
      is_success,
      user,
    };
  }

  async login(username, password) {
    let is_success = false;
    let user = null;
    user = await this.UserRepository.loginUser(username, password);
    if (user == null) {
      return {
        is_success,
        user,
        message: 'incorect username or password',
      };
    }
    is_success = true;
    return {
      is_success,
      user,
    };
  }

  async getUserByID(id) {
    return await this.UserRepository.getUserByID(id);
  }

  async updateUserProfile(userData, id) {
    let is_success = false;
    let user = null;
    user = await this.UserRepository.getUserByID(id);
    if (user == null) {
      return {
        is_success,
        user,
        message: 'user not found',
      };
    }
    user = await this.UserRepository.updateUser(userData, id);
    if (user == null) {
      return {
        is_success,
        user,
        message: 'internal server error',
      };
    }
    is_success = true;
    return {
      is_success,
      user,
    };
  }

  //async updateUser(id) {
    //return await this.UserRepository.updateUser(id);
  //}

  async updatePassword (id, password, confirmPassword) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
    };
    if (password !== confirmPassword) {
      result.reason = 'not match password'
      return result
    }

    const cekUser = await this.UserRepository.getUserById(id)
    if (cekUser=== null) {
      result.reason = 'user not found'
      return result
    } 
    
    const passwordHash = bcrypt.hashSync(password, 10);

    await this.UserRepository.updatePassword(passwordHash, id);
    result.isSuccess = true
    return result
    }
    }
  
// contoh di category.usecase update
// menerima parameter pasword dan confrimn password
// merubah password menjadi bycrt
// cek apaakah user ada 
// udate password ambil dari repositori 

module.exports = UserUC;
