
const mockUserRepo = (
    {
        returnGetUserExist,
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
        }
    )
    
}

module.exports = mockUserRepo
