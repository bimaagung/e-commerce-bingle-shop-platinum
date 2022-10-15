const cloudinary = require("../libs/handle_upload");
const defaultImage = require("../internal/constant/defaultImage");
class AuthUC {
  constructor(AuthRepository, UserRepository) {
    this.AuthRepository = AuthRepository;
    this.UserRepository = UserRepository;
  }

  async register(userData) {
    let result = {
      isSuccess: false,
      reason: "",
      status: 404,
      data: null,
    };
    let user = null
    user = await this.UserRepository.getUserExist(
      userData.username,
      userData.email
    );
    if (user !== null) {
      result.reason = "username or email not aviable";
      return result;
    }
      
    if(userData.image !== defaultImage.DEFAULT_AVATAR){
      let image = await cloudinary.uploadCloudinaryAvatar(userData.image) 
      userData.image = image
      user = await this.AuthRepository.registerUser(userData);
    } else {
       user = await this.AuthRepository.registerUser(userData)
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

    let user = await this.AuthRepository.loginUser(username, password);
    if (user == null) {
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
