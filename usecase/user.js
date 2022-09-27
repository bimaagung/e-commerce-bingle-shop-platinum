class UserUC {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async register(userData) {
    let isSuccess = false;
    let user = null;
    if (
      typeof userData.password !== 'string'
      || typeof userData.username !== 'string'
      || typeof userData.email !== 'string'
    ) {
      return {isSuccess , user}
    }
    user = await this.UserRepository.getUserExist(
      userData.username,
      userData.email,
    );
    if (user !== null) {
      return {
        message: 'username or email not aviable',
      };
    }
    user = await this.UserRepository.registerUser(userData);
    if (user == null) {
      return {
        message: 'internal server error',
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
    user = await this.UserRepository.loginUser(username, password);
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

  async getUserByID(id) {
    return await this.UserRepository.getUserByID(id);
  }

  async updateUserProfile(userData, id) {
    let isSuccess = false;
    let user = null;
    user = await this.UserRepository.getUserByID(id);
    if (user == null) {
      return {
        message: 'user not found',
      };
    }
    user = await this.UserRepository.updateUser(userData, id);
    if (user == null) {
      return {
        message: 'internal server error',
      };
    }
    isSuccess = true;
    return {
      isSuccess,
      user,
    };
  }

  async updateUser(id) {
    return await this.UserRepository.updateUser(id);
  }
}
module.exports = UserUC;
