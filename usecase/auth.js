/* eslint-disable consistent-return */
const defaultImage = require("../internal/constant/defaultImage");
class AuthUC {
  constructor(AuthRepository, UserRepository, bcrypt, cloudinary) {
    this.AuthRepository = AuthRepository;
    this.UserRepository = UserRepository;
    this.bcrypt = bcrypt;
    this.cloudinary = cloudinary;
  }

  async register(userData) {
    let result = {
      isSuccess: false,
      reason: "",
      status: 404,
      data: null,
    };

    let user = await this.UserRepository.getUserExist(
      userData.username,
      userData.email
    );
    if (userData.password !== userData.confrimPassword) {
      result.reason = "password and confrim password not match";
      return result;
    }
    if (user !== null) {
      result.reason = "username or email not aviable";
      return result;
    }

    userData.password = this.bcrypt.hashSync(userData.password, 10);

    if (userData.image !== defaultImage.DEFAULT_AVATAR) {
      let image = await this.cloudinary.uploadCloudinaryAvatar(userData.image);
      userData.image = image;
      user = await this.AuthRepository.registerUser(userData);
    } else {
      user = await this.AuthRepository.registerUser(userData);
    }

    result.isSuccess = true;
    result.status = 200;
    result.data = user;
    return result;
  }

  async login(username, password) {
    let result = {
      isSuccess: false,
      reason: "",
      status: 404,
      data: null,
    };

    let user = await this.AuthRepository.loginUser(username);
    if (user == null) {
      result.reason = "incorect username or password";
      return result;
    }
    if (!this.bcrypt.compareSync(password, user.password)) {
      result.reason = "incorect username or password";
      return result;
    }
    result.isSuccess = true;
    result.status = 200;
    result.data = user;
    return result;
  }
}
module.exports = AuthUC;
