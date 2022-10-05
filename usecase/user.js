class UserUC {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async getUserExist(username , email){
    return await this.UserRepository.getUserExist(username, email)
    
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
    user = await this.UserRepository.updateUser(userData , id)
    isSuccess = true;
    return {
      isSuccess,
      user,
    };
  }
}
module.exports = UserUC;
