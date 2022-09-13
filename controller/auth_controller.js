const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const resData = require('../helper/reponse')

module.exports = {
    login: async (req, res, next) => {
        try {
            let { username, password } = req.body

            let user = await req.userUC.getUserByUsername(username)
            if (user == null) {
                return res
                    .status(400)
                    .json(resData.failed('username or email unavailable', null))
            }
            if (bcrypt.compareSync(password, user.password) !== true) {
                return res
                    .status(400)
                    .json(resData.failed('username or email unavailable', null))
            }
            const accessToken = jwt.sign(
                {
                    id: user.id,
                    username: user.username
                },
                process.env.JWT_KEY_SECRET,
                {
                    expiresIn: '6h'
                }
            )
            res.json({
                status: "OK",
                message: "success",
                token : accessToken
            })
        } catch (e) {
            next(e)
        }
    },
    register: async (req, res, next) => {
        try {
            let user = {
                name: req.body.name,
                username: req.body.username,
                image: null,
                telp: req.body.telp,
                email: req.body.email,
                password: req.body.password,
                is_admin: false
            }

            if (req.body.password !== req.body.confrimPassword) {
                return res
                    .status(400)
                    .json(resData.failed('password and confrim password not match', null))
            }
            let password = bcrypt.hashSync(req.body.password, 10)
            let confrimPassword = bcrypt.hashSync(req.body.confrimPassword, 10)

            user.password = password
            user.confrimPassword = confrimPassword
            
            let checkUserExist = await req.userUC.getUserExist(user.username, user.email)    
            if (checkUserExist != null) {    
                return res
                    .status(400)
                    .json(resData.failed('username or email unavailable', null))
            }
            let addUser = await req.userUC.createUser(user)
            if (addUser.isSuccess !== true) {
                return res
                    .status(500)
                    .json(resData.server_error('somthing went wrong', null))
            }
            delete user.password
            delete user.confrimPassword
            delete user.is_admin
            res.json(resData.success(user))

        } catch (e) {
            next(e)
        }
    }
}