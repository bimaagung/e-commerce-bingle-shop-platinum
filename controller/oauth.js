const resData = require('../helper/response')
module.exports = {
    loginWithGooglePage: async (req, res, next) => {
        try {
            res.render('google-login')
        } catch (e) {
            next(e)
        }
    },
    loginWithGoogle :async (req, res, next) =>{
        let idToken =req.body.idToken
        try {
            let resUser = await req.authUC.loginGoogle(idToken);
            if (resUser.isSuccess !== true) {
              return res.status(resUser.status).json(resData.failed(resUser.reason));
            }
            res.status(200).json(resData.success({
              user: resUser.data,
              token: resUser.token,
            }));
        } catch (e) {
            next(e)
        }
    },
}