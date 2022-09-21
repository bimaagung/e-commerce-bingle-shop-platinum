const jwt = require('jsonwebtoken')
class UserUC {
  constructor(UserRepository) {
    this.UserRepository = UserRepository
  }
  async register(user_data) {
    let is_success = false
    let user = null
    if (typeof user_data.password !== "string" || typeof user_data.username !== "string" || typeof user_data.email !== "string") {
      return return_data
    }
    user = await this.UserRepository.getUserExist(user_data.username, user_data.email)
    if (user !== null) {
      return {
        is_success: is_success,
        user: user,
        message: "username or email not aviable"
      }
    }
    user = await this.UserRepository.registerUser(user_data)
    if (user == null) {
      return {
        is_success: is_success,
        user: user,
        message: "internal server error"
      }
    }
    is_success = true
    return {
      is_success: is_success,
      user: user
    }
  }
  async login(username, password) {
    let is_success = false
    let user = null
    user = await this.UserRepository.loginUser(username, password)
    if (user == null) {
      return {
        is_success: is_success,
        user: user,
        message: "incorect username or password"
      }
    }
    is_success = true
    return {
      is_success: is_success,
      user: user
    }

  }

}

module.exports = UserUC
