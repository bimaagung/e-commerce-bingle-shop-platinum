const resData = require('../helper/response')

module.exports = {
    getUserById : async (req, res, next) => {
      try {  
        const { id } = req.params;
        const user_id = await req.userUC.getUserById(id);

        if (user_id == null) {
            return res.status(404).json(resData.failed('User not found', null));

        }
        res.status(200).json(
          resData.success(user_id)
        )
      } catch (e) {
        next(e);
        }
    }
}