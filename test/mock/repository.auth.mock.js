
const mockAuthRepo = (
    {
        returnRegisterUser,
        returnLoginUser,
        returnLoginWithGoogle
    }
) => {
    const repo = {}
    repo.registerUser = jest.fn().mockReturnValue(
        returnRegisterUser !== true ? returnRegisterUser : {
           
            name: "kian",
            username: "kian28",
            image: "http://res.cloudinary.com/dnvltueqb/image/upload/v1665839687/avatar/1665839685354_test_trwixd.jpg",
            telp: "0823155511",
            email: "kian@gmail.com",
            is_admin: false,
        }
    )
    repo.loginUser = jest.fn().mockReturnValue(
        returnLoginUser !== true ? returnLoginUser : {
          
            name: "test",
            image: "url_image",
            username: "testusername",
            email: "test@email.com",
        }
    )
    repo.loginWithGoogle = jest.fn().mockReturnValue(
        returnLoginWithGoogle !== true ? returnLoginWithGoogle : {
           
            name: "kian",
            username: "kian28",
            image: "http://res.cloudinary.com/dnvltueqb/image/upload/v1665839687/avatar/1665839685354_test_trwixd.jpg",
            telp: "0823155511",
            email: "kian@gmail.com",
            is_admin: false,
        }
    )
    return repo

}

module.exports = mockAuthRepo
