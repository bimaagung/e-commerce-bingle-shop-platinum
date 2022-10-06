const generateToken = require("../helper/jwt");
const resData = require("../helper/response");
const url = require("../libs/handle_upload");
const _= require("lodash")

module.exports = {
  login: async (req, res, next) => {
    try {
      let { username, password } = req.body;
      let resUser = await req.authUC.login(username, password);
      if (resUser.isSuccess !== true) {
        return res.status(resUser.status).json(resData.failed(resUser.reason));
      }
      const user = _.omit(resUser.data.dataValues, ['password'])
      const token = generateToken(user)
      res.json(resData.success({user, token}))
    } catch (e) {
      next(e);
    }
  },

  register: async (req, res, next) => {
    try {
      let userData = {
        name: req.body.name,
        username: req.body.username,
        image: null,
        telp: req.body.telp,
        email: req.body.email,
        password: req.body.password,
        is_admin: false,
      };

      if (req.body.password !== req.body.confrimPassword) {
        return res
          .status(400)
          .json(
            resData.failed("password and confrim password not match", null)
          );
      }
      let image = null;
      if (req.file !== undefined) {
        image = await url.uploadCloudinaryAvatar(req.file.path);
      } else {
        image = process.env.PROFIL_URL;
      }
      userData.image = image;

      let resUser = await req.authUC.register(userData);

      if (resUser.isSuccess !== true) {
        return res
          .status(resUser.status)
          .json(resData.failed(resUser.reason));
      }
      const user = _.omit(resUser.data.dataValues, ['password'])
      const token = generateToken(user)
      res.json(resData.success({ user, token }));
    } catch (e) {
      next(e);
    }
  },
};
