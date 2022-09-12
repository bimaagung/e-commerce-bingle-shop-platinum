const bcrypt = require ('bcrypt')
const resData = require('../helper/reponse')

module.exports = {
    login: async (req, res, next) =>{
        try {
            let {username, password} = req.body

            let user = await req.userUC.getUserByUsername(username)
            if(user == null){
               return res 
               .status(400)
               .json(resData.failed('username or password incorrect', null))
            }
            if(bcrypt.compareSync(password, user.password)!== true){
                return res
                    .status(400)
                    .json(resData.failed('username or password incorrect', null))
            }
            user =user.toJSON()
            delete user.password
            
             res.json(resData.success(user))
     
        } catch (e) {
            next(e)
        }
    },
    register : async(req, res, next)=>{
        try {
            let user ={
                name : req.body.name,
                username : req.body.username,
                image: null,
                telp : req.body.telp,
                email : req.body.email,
                password: req.body.password,
                is_admin : false
            }
            
            if(req.body.password !== req.body.confrimPassword){
                return res
                .status(400)
                .json(resData.failed('password and confrim password not match',null))
            }
            let password =bcrypt.hashSync(req.body.password, 10)
            let confrimPassword = bcrypt.hashSync(req.body.confrimPassword, 10)

            user.password = password
            user.confrimPassword = confrimPassword

            let getUserUsername = await req.userUC.getUserByUsername(user.username)
            let getUserEmail = await req.userUC.getUserByEmail(user.email)
            if(getUserEmail !== null || getUserUsername !== null){
                return res
                .status(400)
                .json(resData.failed('user already use',null))
            }
            let addUser = await req.userUC.createUser(user)
            if(addUser.isSuccess !==true){
                return res  
                    .status(500)
                    .json(resData.server_error('somthing went wrong', null))
            }
                delete user.password
                delete user.confrimPassword
                res.json(resData.success(user))

        } catch (e) {
            next(e)
        }
    }
}