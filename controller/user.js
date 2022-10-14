const resData = require("../helper/response");

module.exports = {
  getOneUser: async (req, res, next) => {
    try {
      let id = req.user.id;
      let user = await req.userUC.getUserByID(id);

      if (user == null) {
        return res.status(400).json(resData.failed("list is empty", null));
      }

      res.json(resData.success(user));
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      let id = req.user.id;
      let user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        alamat: req.body.alamat,
        telp: req.body.telp,
      };
      let updateUser = await req.userUC.updateUserProfile(user, id);
      if (updateUser.isSuccess !== true) {
        return res
          .status(updateUser.status)
          .json(resData.failed(updateUser.reason));
      }
      res.status(200).json(resData.success());
    } catch (error) {
      next(error);
    }
  },

  updateAvatar: async (req, res, next) => {
    try {
      let id = req.user.id;
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
};
