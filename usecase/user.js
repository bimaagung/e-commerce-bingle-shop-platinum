class UserUC {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
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
