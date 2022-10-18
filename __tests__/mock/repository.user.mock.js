
const mockUserRepo = (
    {
        returnGetUserExist,
        returnGetUserByID,
        returnUpdatePassword,
        returnUpdateUser
    }
) => {
    const repo = {}
    repo.getUserExist = jest.fn().mockReturnValue(
        returnGetUserExist !== true ? returnGetUserExist : {
            name: 'user',
            username: 'user1',
            image: 'http://localhost:8080/images/user1.jpg',
            telp: '0847383672',
            email: 'user@example.com',
        }
    )

    repo.getUserByID = jest.fn().mockReturnValue(
        returnGetUserByID !== true ? returnGetUserByID : {
            name: 'user',
            username: 'user1',
            image: 'http://localhost:8080/images/user1.jpg',
            telp: '0847383672',
            email: 'user@example.com',
        }
    )

    repo.updatePassword = jest.fn().mockReturnValue(
        returnUpdatePassword !== true ? returnUpdatePassword : true
    )

    repo.updateUser = jest.fn().mockReturnValue(
        returnUpdateUser !== true ? returnUpdateUser : true
    )

    return repo

}

module.exports = mockUserRepo
