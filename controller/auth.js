const generateToken = require('../helper/jwt');
const resData = require('../helper/response');
const url = require('../libs/handle_upload');

module.exports = {
  login: async (req, res, next) => {
    try {
      let { username, password } = req.body;

      let user = await req.userUC.login(username, password);
      if (!user.isSuccess) {
        return res
          .status(400)
          .json(resData.failed(user.message));
      }

      res.json({
        status: 'ok',
        message: 'success',
        token: generateToken(user.user),
      });
    } catch (e) {
      next(e);
    }
  },

  register: async (req, res, next) => {
    try {
      let user = {
        name: req.body.name,
        username: req.body.username,
        image: null,
        telp: req.body.telp,
        email: req.body.email,
        password: req.body.password,
        is_admin: false,

      };

      let image = null;
      if (req.file !== undefined) {
        image = await url.uploadCloudinaryAvatar(req.file.path);
      } else {
        image = process.env.PROFIL_URL;
      }
      user.image = image;

      if (req.body.password !== req.body.confrimPassword) {
        return res
          .status(400)
          .json(resData.failed('password and confrim password not match', null));
      }
      let resUser = await req.userUC.register(user);
      if (resUser.isSuccess != true) {
        return res.status(400).json(resData.failed(resUser.message));
      }
      res.json(
        resData.success({
          name: user.name,
          username: user.username,
          email: user.email,
          token: generateToken(user),
        }),
      );
    } catch (e) {
      next(e);
    }
  },
};
