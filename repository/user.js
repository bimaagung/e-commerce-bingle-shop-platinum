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
    async getUserByEmail (email){
        let user = null
        try {
            user = await this.UserModel.findOne({
                where : {email:email}
            })
        } catch (e) {
            console.log(e)
        }
        return user
    }
    async createUser(user){
        let isSuccess = false
        try {
            user = await this.UserModel.create(user)
            isSuccess = true
        } catch (e) {
            console.log(e)
        }
        return {
            isSuccess : isSuccess,
            user : user
        }
    }
    
}

module.exports =UserRepository