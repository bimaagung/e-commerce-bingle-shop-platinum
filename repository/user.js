const { Op } = require('sequelize');
const { User } = require('../models');

class UserRepository {
  constructor() {
    this.UserModel = User;
  }

  async getUserExist(username, email) {
    return await this.UserModel.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
  }

  async updatePassword(newPassword, id) {
    const password = await this.updatePassword(newPassword, {
      where: { id },
    });
    return password;
  }

  async getUserByID(id) {
    return await this.UserModel.findOne({
      where: { id },
     
    });
  }

  async updateUser(user, id) {
    return await this.UserModel.update(user, {
      where: { id },
    });
  }
}

module.exports = UserRepository;
