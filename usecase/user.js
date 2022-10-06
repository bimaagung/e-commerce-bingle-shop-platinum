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
    let result = {
      isSuccess : false,
      reason : "success",
      status : 404,
      data : null
     }
   let user = await this.UserRepository.getUserByID(id);
    if (user == null) {
      result.reason = 'user not found'
      return result
    }
    user = await this.UserRepository.updateUser(userData , id)
    result.isSuccess = true;
    return result
  }
}
module.exports = UserUC;