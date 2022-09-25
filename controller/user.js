const resData = require('../helper/response')

module.exports = {
    getUserById : async (req, res, next) => {
      try {  
        const id  = req.user.id;
        const user = await req.userUC.getUserById(id);

        if (user == null) {
            return res.status(404).json(resData.failed('User not found', null));

        }
        res.json(resData.success(user))
      } catch (e) {
        next(e);
      }
    }
}
