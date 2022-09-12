class UserUC {
    constructor (UserRepository){
        this.UserRepository = UserRepository
    }
    async getUserByUsername(username){
        return await this.UserRepository.getUserByUsername(username)
    }
    async getUserByID(id){
        return await this.UserRepository.getUserByID(id)
    }
}


module.exports = UserUC