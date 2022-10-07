const resData = require('../helper/response')

module.exports = {
  getUserById: async (req, res, next) => {
    try {
      const id = req.user.id;
      const user = await req.userUC.getUserById(id);

      if (user == null) {
        return res.status(404).json(resData.failed('User not found', null));

      }
      res.json(resData.success(user))
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        alamat: req.body.alamat,
        telp: req.body.telp
      };

      const existUser = (id) => {
        const user = this.getUserById(id);
        if (user == null) {
          return false
        }
        return true;
      };
      if (!existUser) {
        return res.status(404)
          .json(resData.failed('user not found', null));
      }

      const updateUser = await req.userUC.updateUser(id, user);
      if (updateUser == null) {
        return res
          .status(400)
          .json(resData.failed('failed to update user', null));
      }

      res.json(resData.success(user));
    } catch (error) {
      next(error);
    }
  },

  updatePassword : async (req, res, next) => {
    try {
      const { id } = req.user
      const password = req.body.password
      const confirmPassword = req.body.confirm_password

      const updatePassword = await req.userUC.updatePassword (id, password, confirmPassword)
      if (updatePassword === null) {
        res.status(404).json(resData.failed(updatePassword.reason))
      }
      res.sattus(200).json(resData.success())
    }catch(error) {
      next(error);
    }
  }

}
