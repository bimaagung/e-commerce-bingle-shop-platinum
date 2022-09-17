class UserUC {
  constructor(UserRepository) {
    this.UserRepository = UserRepository
  }
  async getUserByUsername(username) {
    return await this.UserRepository.getUserByUsername(username)
  }
  async getUserExist(username, email) {
    return await this.UserRepository.getUserExist(username, email)
  }
  async createUser(user) {
    return await this.UserRepository.createUser(user)
  }
}

module.exports = UserUC
