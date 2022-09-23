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
  updateAvatar: async (req, res, next) => {
    try {
      let id = req.params.id;
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
