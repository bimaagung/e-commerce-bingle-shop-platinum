class UserUC {
    constructor (UserRepository){
        this.UserRepository = UserRepository
    }
    async getUserExist(username, email){
        return await this.UserRepository.getUserExist(username, email)
    }
    async createUser(user){
        return await this.UserRepository.createUser(user)
    }
    
}


module.exports = UserUC