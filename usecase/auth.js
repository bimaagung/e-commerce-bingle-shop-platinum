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

    let user = await this.UserRepository.getUserExist(
      userData.username,
      userData.email
    );
    if (user !== null) {
      result.reason = "username or email not aviable";
      return result;
    }
    user = await this.AuthRepository.registerUser(userData);
    result.isSuccess = true;
    result.isSuccess = 200;
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
