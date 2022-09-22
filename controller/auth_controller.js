const generateToken = require('../helper/jwt');
const resData = require('../helper/response');

module.exports = {
  login: async (req, res, next) => {
    try {
      let { username, password } = req.body;

      let user = await req.userUC.login(username, password);
      if (!user.is_success) {
        return res
          .status(400)
          .json(resData.failed(user.message));
      }
      
      res.json({
        status: 'ok',
        message: 'success',
        token: generateToken(user),
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
        telp: req.body.telp,
        email: req.body.email,
        password: req.body.password,
        is_admin: false,

      };
      if (req.body.password !== req.body.confrimPassword) {
        return res
          .status(400)
          .json(resData.failed('password and confrim password not match', null));
      }
      let resUser = await req.userUC.register(user)
      if (resUser.is_success != true) {

        return res.status(400).json(resData.failed(resUser.message))
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
