const { User } = require('../models')
const {Op}= require('sequelize')


class UserRepository {
    constructor() {
        this.UserModel = User

    }
    async getUserExist(username, email, telp) {
        let user = null
        try {
            user = await this.UserModel.findOne({
                where : {
                    [Op.or] : [
                        {username : username},
                        {email : email},
                        {telp : telp}
                    ]
                }
            })
        } catch (e) {
            console.log(e)
        }
        return user
    }
   
    async createUser(user) {
        let isSuccess = false
        try {
            user = await this.UserModel.create(user)
            isSuccess = true
        } catch (e) {
            console.log(e)
        }
        return {
            isSuccess: isSuccess,
            user: user
        }
    }

}

module.exports = UserRepository