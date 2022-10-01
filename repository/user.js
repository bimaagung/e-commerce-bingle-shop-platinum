const { User } = require('../models')
const {Op}= require('sequelize')
const bcrypt = require('bcrypt');

class UserRepository {
    constructor() {
        this.UserModel = User

    }
    async getUserExist(username, email) {
        let user = null
        try {
            user = await this.UserModel.findOne({
                where : {
                    [Op.or] : [
                        {username : username},
                        {email : email}
                     
                    ]
                }
            })
        } catch (e) {
            console.log(e)
        }
        return user
    }
   
    async getUserByUsername (username) {
        try {
            return await this.UserModel.findOne({
                where:{username:username}
            })
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async registerUser(user_data) {
        user_data.password = bcrypt.hashSync(user_data.password, 10)
        user_data.is_admin = false

        let user = null
        try {
            user = await this.UserModel.create(user_data)
        } catch (e) {
            console.error(e)
            return null
        }

        return user
    }
    async loginUser(username, password){
        let user = null
        try {
            user = await this.getUserByUsername(username)
            if(user === null){
                return user
            }
        } catch (e) {
            console.log(e)
            return null
        }
        if(!bcrypt.compareSync(password, user.password)){
            return null
        }
        return user
    }
    async updatePassword (password) {
        let password = null
        try {
            password = await this.updatePassword(password)
            if(password === null) {
                return user
            }
        } catch (e) {
            console.log(e)
            return null
        }
        if (req.body.password !== req.body.confrimPassword) {
            return res
              .status(400)
              .json(resData.failed('password and confrim password not match', null));
          }
    }

}

module.exports = UserRepository