const googleOauth = require ('../libs/google-auth')
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
        let data = await googleOauth(idToken)
        try {
            let resUser = await req.authUC.loginGoogle(data.email);
            if (resUser.isSuccess !== true) {
              return res.status(resUser.status).json(resData.failed(resUser.reason));
            }
            res.status(200).json(resData.success({
              user: resUser.data,
              token: resUser.token,
            }));
            res.json(data)
        } catch (e) {
            next(e)
        }
    }
}