const bcrypt = require("bcrypt");
const { User } = require("../models");

class AuthRepository {
  constructor() {
    this.UserModel = User;
  }

  async registerUser(userData) {
    userData.password = bcrypt.hashSync(userData.password, 10);
    userData.is_admin = false;
    return await this.UserModel.create(userData);
  }

  async loginUser(username, password) {
    let user = null;
    user = await this.getUserByUsername(username);
    if (user === null) {
      return user;
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return null;
    }
    return user
  }
  async getUserByUsername(username) {
    return await this.UserModel.findOne({
      where: { username },
    });
  }

}

module.exports = AuthRepository;
