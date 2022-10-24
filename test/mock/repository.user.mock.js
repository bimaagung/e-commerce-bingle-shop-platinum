
const mockUserRepo = (
    {
        returnGetUserExist,
        returnGetUserByID,
        returnUpdatePassword,
        returnUpdateUser,
        returnGetUserByEmail,
        returnGetUserByUsername
    }
) => {
    const repo = {}
    repo.getUserExist = jest.fn().mockReturnValue(
        returnGetUserExist !== true ? returnGetUserExist : {
            id:1,
            name: 'user',
            username: 'user1',
            image: 'http://localhost:8080/images/user1.jpg',
            telp: '0847383672',
            email: 'user@example.com',
        }
    )

    repo.getUserByID = jest.fn().mockReturnValue(
        returnGetUserByID !== true ? returnGetUserByID : {
            id: 1,
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

     repo.getUserByEmail = jest.fn().mockReturnValue(
        returnGetUserByEmail !== true ? returnGetUserByEmail : {
            id: 1,
            name: 'user',
            username: 'user1',
            image: 'http://localhost:8080/images/user1.jpg',
            telp: '0847383672',
            email: 'user@example.com',
        }
    )

     repo.getUserByUsername = jest.fn().mockReturnValue(
        returnGetUserByUsername !== true ? returnGetUserByUsername : {
            id: 1,
            name: 'user',
            username: 'user1',
            image: 'http://localhost:8080/images/user1.jpg',
            telp: '0847383672',
            email: 'user@example.com',
        }
    )

    return repo

}

module.exports = mockUserRepo
