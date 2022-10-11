
const mockUserRepo = (
    {
        returnGetUserExist,
        returnGetUserByID
    }
) => {
    const repo = {}
    repo.getUserExist = jest.fn().mockReturnValue(
        returnGetUserExist !== true ? returnGetUserExist : true
    )

    repo.getUserByID = jest.fn().mockReturnValue(
        returnGetUserByID !== true ? returnGetUserByID : true
    )

    return repo

}

module.exports = mockUserRepo
