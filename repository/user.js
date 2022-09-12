const{User} =require ('../models')
const {address} = require('../models')


class UserRepository {
    constructor (){
        this.UserModel = User
        this.AddressModel = address
    }
    async getUserByUsername (username){
        let user = null
        try {
            user = await this.UserModel.findOne({
                where : {username:username},
                include : [
                    {
                        model:this.AddressModel,
                        as: 'address'
                        
                        
                    }
                ]
            })
        } catch (e){
            console.log(e)
        }
        return user
    }
    
}

module.exports =UserRepository