
module.exports = {
    loginWithGooglePage: async (req, res, next) => {
        try {
            res.render('google-login')
        } catch (e) {
            next(e)
        }
    }
}