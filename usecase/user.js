class UserUC {
  constructor(UserRepository, bcrypt) {
    this.UserRepository = UserRepository;
    this.bcrypt = bcrypt;
  }

  async getUserExist(username, email) {
    return await this.UserRepository.getUserExist(username, email);
  }

  async getUserByID(id) {
    return await this.UserRepository.getUserByID(id);
  }

  async updateUserProfile(userData, id) {
    let result = {
      isSuccess: false,
      reason: 'success',
      status: 404,
      data: null,
    };
    let user = await this.UserRepository.getUserByID(id);
    if (user == null) {
      result.reason = 'user not found';
      return result;
    }
    user = await this.UserRepository.updateUser(userData, id);
    result.isSuccess = true;
    return result;
  }

  async updatePassword(id, user) {
    let result = {
      isSuccess: false,
      reason: 'success',
      statusCode: 404,
      data: null,
    };

    if (user.password !== user.retypePassword) {
      result.reason = 'password not match';
      result.statusCode = 400;
      return result;
    }

    let userById = await this.UserRepository.getUserByID(id);

    if (userById === null) {
      result.reason = 'user not found';
      return result;
    }

    const userData = {
      password: await this.bcrypt.hashSync(user.password, 10),
    };

    await this.UserRepository.updateUser(userData, id);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = UserUC;
