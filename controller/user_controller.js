const resData = require("../helper/response");

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
};
