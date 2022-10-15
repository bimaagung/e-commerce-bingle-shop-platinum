class UserUC {
  constructor(UserRepository, bcrypt, cloudinary) {
    this.UserRepository = UserRepository;
    this.bcrypt = bcrypt;
    this.cloudinary = cloudinary;
  }

  async getUserExist(username, email) {
    return await this.UserRepository.getUserExist(username, email);
  }

  async getUserByID(id) {
    let result = {
      isSuccess: false,
      reason: null,
      statusCode: 404,
      data: null,
    };

    const user = await this.UserRepository.getUserByID(id);

    if (user === null) {
      result.reason = 'user not found';
      return result;
    }

    result.isSuccess = true;
    result.data = user;
    result.statusCode = 200;

    return result;
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

    if (user.password !== user.retype_password) {
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

  async updateUserImage(userData, id) {
    let result = {
      isSuccess: false,
      reason: null,
      statusCode: 404,
      data: null,
    };

    let user = await this.UserRepository.getUserByID(id);

    if (user == null) {
      result.reason = 'user not found';
      return result;
    }
    userData.image = await this.cloudinary.uploadCloudinaryAvatar(userData.image);

    await this.UserRepository.updateUser(userData, id);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = UserUC;
