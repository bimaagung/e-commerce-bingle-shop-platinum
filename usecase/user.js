class UserUC {
    constructor (UserRepository){
        this.UserRepository = UserRepository
    }
    async getUserExist(username, email, telp){
        return await this.UserRepository.getUserExist(username, email, telp)
    }
    async createUser(user){
        return await this.UserRepository.createUser(user)
    }
    
}


module.exports = UserUC