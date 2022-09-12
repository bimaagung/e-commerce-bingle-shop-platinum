class UserUC {
    constructor (UserRepository){
        this.UserRepository = UserRepository
    }
    async getUserByUsername(username){
        return await this.UserRepository.getUserByUsername(username)
    }
}


module.exports = UserUC