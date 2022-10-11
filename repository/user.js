const { Op } = require("sequelize");
const { User } = require("../models");

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
  
  async updatePassword(newPassword) {
    let password = null;
    try {
      password = await this.updatePassword(newPassword);
      if (password === null) {
        return user;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
    if (req.body.password !== req.body.confrimPassword) {
      return res
        .status(400)
        .json(resData.failed("password and confrim password not match", null));
    }
  }

  async getUserByID(id) {
    return await this.UserModel.findOne({
      where: { id },
      attributes: { exclude: ["password", "is_admin"] },
    });
  }

  async updateUser(user, id) {
    return await this.UserModel.update(user, {
      where: { id },
    });
  }
}

module.exports = UserRepository;
