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
    getuser :async (req, res, next)=>{
        let id = req.params.id
        let user = await req.userUC.getUserByID(id)
        res.json(resData.success(user))
      }
}