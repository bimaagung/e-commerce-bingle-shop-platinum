const bcrypt = require('bcrypt')
require('dotenv').config();
const mockAuthRepo = (
    {
        returnRegisterUser,
        returnLoginUser,
    }
) => {
    const repo = {}
    repo.registerUser = jest.fn().mockReturnValue(
        returnRegisterUser !== true ? returnRegisterUser : {
            id: 1,
            name: "test",
            image: "url_image",
            username: "testusername",
            email: "test@email.com",
            password: bcrypt.hashSync('123456', 10)
        }
    )
    repo.loginUser = jest.fn().mockReturnValue(
        returnLoginUser !== true ? returnLoginUser : {
            id: 1,
            name: "test",
            image: "url_image",
            username: "testusername",
            email: "test@email.com",
        }
    )
    return repo

}

module.exports = mockAuthRepo
