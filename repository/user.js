const{User} =require ('../models')

class UserRepository {
    constructor (){
        this.UserModel = User
    }
    async getUserByUsername (username){
        let user = null
        try {
            user = await this.UserModel.findOne({
                where : {username:username}
            })
        } catch (e){
            console.log(e)
        }
        return user
    }
}

module.exports =UserRepository