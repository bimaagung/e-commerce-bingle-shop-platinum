const resData = require("../helper/response");

module.exports = {
  getOneUser: async (req, res, next) => {
    try {
      let { id } = req.user;
      let user = await req.userUC.getUserByID(id);

      if (user.isSuccess === false) {
        return res.status(user.statusCode).json(resData.failed(user.reason));
      }

      res.status(user.statusCode).json(resData.success(user.data));
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      let { id } = req.user;
      let user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        telp: req.body.telp,
      };

      let updateUser = await req.userUC.updateUserProfile(user, id);

      if (updateUser.isSuccess === false) {
        return res
          .status(updateUser.statusCode)
          .json(resData.failed(updateUser.reason));
      }

      res.status(updateUser.statusCode).json(resData.success());
    } catch (error) {
      next(error);
    }
  },

  updateAvatar: async (req, res, next) => {
    try {
      let { id } = req.user;
      let user = {
        image: req.file.path,
      };
      let updateAvatar = await req.userUC.updateUserImage(user, id);
      if (updateAvatar.isSuccess != true) {
        return res
          .status(updateAvatar.status)
          .json(resData.failed(updateAvatar.reason));
      }
      res.status(updateAvatar.status).json(resData.success());
    } catch (e) {
      next(e);
    }
  },

  updatePassword: async (req, res, next) => {
    try {
      let { id } = req.user;
      let user = req.body;

      let updatePassword = await req.userUC.updatePassword(id, user);

      if (updatePassword.isSuccess === false) {
        return res
          .status(updatePassword.statusCode)
          .json(resData.failed(updatePassword.reason));
      }

      res.status(updatePassword.statusCode).json(resData.success());
    } catch (error) {
      next(error);
    }
  },
};
