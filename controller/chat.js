const resData = require('../helper/response');

module.exports = {
  getListChatByUserId: async (req, res, next) => {
    /*
        #swagger.tags = ['Chat']
    */
    try {
      const userId = req.user.id;

      const chats = await req.chatUC.getListChatByUserId(userId);

      res.status(200).json(resData.success(chats.data));
    } catch (e) {
      next(e);
    }
  },
};
