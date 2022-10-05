const resData = require("../helper/response");
const url = require("../libs/handle_upload");

module.exports = {
  getOneUser: async (req, res, next) => {
    try {
      let id = req.params.id;
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

  updateAvatar: async (req, res, next) => {
    try {
      let id = req.user.id
      let user = {
        image:null,
      };
      let image = null;
      if (req.file !== undefined) {
        image = await url.uploadCloudinaryAvatar(req.file.path);
      } else {
        image = process.env.PROFIL_URL;
      }
      user.image = image;

      let updateAvatar = await req.userUC.updateUserProfile(user, id);
      if (updateAvatar.is_success != true) {
        return res.status(400).json(resData.failed(updateAvatar.message));
      }
      res.status(200).json(resData.success());
    } catch (e) {
      next(e);
    }
  },
};
