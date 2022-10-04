const bcrypt = require('bcrypt')
require('dotenv').config();
const mockAuthRepo = (
    {
        returnGetUserExist,
        returnRegisterUser,
        returnLoginUser,
        returnGetUserByID,
        returnupdateUser,
    }
)=> {
    const repo = {}
    repo.getUserExist= jest.fn().mockReturnValue(
        returnGetUserExist !== true ? returnGetUserExist : {
            id : 1,
            name : "test",
            username : "testusername",
            email : "test@email.com",
            password : bcrypt.hashSync('123456', 10)
        }
    )
    repo.registerUser= jest.fn().mockReturnValue(
        returnRegisterUser !== true ? returnRegisterUser :{
            id : 1,
            name : "test",
            image : "url_image",
            username : "testusername",
            email : "test@email.com",
            password : bcrypt.hashSync('123456', 10)
        }
    )
    repo.loginUser = jest.fn().mockReturnValue(
        returnLoginUser !== true ? returnLoginUser : {
            id : 1,
            name : "test",
            image : "url_image",
            username : "testusername",
            email : "test@email.com",
        }
    )
    
}

module.exports = mockAuthRepo
