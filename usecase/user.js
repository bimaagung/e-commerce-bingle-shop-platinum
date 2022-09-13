class UserUC {
    constructor (UserRepository){
        this.UserRepository = UserRepository
    }
    async getUserByUsername(username){
        return await this.UserRepository.getUserByUsername(username)
    }
    async getUserByEmail(email){
        return await this.UserRepository.getUserByEmail(email)
    }
    async getUserByTelp(telp){
        return await this.UserRepository.getUserByTelp(telp)
    }
    async createUser(user){
        return await this.UserRepository.createUser(user)
    }
    
}


module.exports = UserUC