class AuthUC {
    constructor(AuthRepository , UserRepository) {
      this.AuthRepository = AuthRepository;
      this.UserRepository = UserRepository;
    }
  
    async register(userData) {
      let isSuccess = false;
      let user = null;
      user = await this.UserRepository.getUserExist(
        userData.username,
        userData.email,
      );
      if (user !== null) {
        return {
          message: 'username or email not aviable',
        };
      }
      isSuccess = true;
      return {
        isSuccess,
        user,
      };
    }
  
    async login(username, password) {
      let isSuccess = false;
      let user = null;
      user = await this.AuthRepository.loginUser(username, password);
      if (user == null) {
        return {
          isSuccess,
          user,
          message: 'incorect username or password',
        };
      }
      isSuccess = true;
      return {
        isSuccess,
        user,
      };
    }
   
  }
  module.exports = AuthUC;
  