const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { User } = require("../models");

class UserRepository {
  constructor() {
    this.UserModel = User;
  }

  async getUserExist(username, email) {
    let user = null;
    try {
      user = await this.UserModel.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
    } catch (e) {
      console.log(e);
    }
    return user;
  }

  async getUserByUsername(username) {
    try {
      return await this.UserModel.findOne({
        where: { username },
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getUserById(id) {
    try {
      return await this.UserModel.findOne({
        where: { id },
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async registerUser(userData) {
    userData.password = bcrypt.hashSync(userData.password, 10);
    userData.is_admin = false;

    let user = null;
    try {
      user = await this.UserModel.create(userData);
    } catch (e) {
      return null;
    }

    return user;
  }

  async loginUser(username, password) {
    let user = null;
    try {
      user = await this.getUserByUsername(username);
      if (user === null) {
        return user;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return null;
    }
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
