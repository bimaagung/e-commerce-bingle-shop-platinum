
const mockUserRepo = (
    {
        returnGetUserExist,
    }
) => {
    const repo = {}
    repo.getUserExist = jest.fn().mockReturnValue(
        returnGetUserExist !== true ? returnGetUserExist : true
    )
    return repo

}

module.exports = mockUserRepo
