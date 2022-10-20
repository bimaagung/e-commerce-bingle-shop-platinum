module.exports = {
    userNotFound: {
        status: 'failed',
        message: 'user id not found',
        data: "null"
    },
    notMatchPassword: {
        status: 'failed',
        message: 'password not match',
    },
    successUser: {
        status: 'ok',
        message: 'success',
    },
    successGetUserById: {
        "status": "ok",
        "message": "success",
        "data": {
            "id": 2,
            "name": "customer",
            "username": "customer",
            "image": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815145/default%20image/profile_xzrsh7.png",
            "telp": "0823111111",
            "email": "customern@mail.com",
            "createdAt": "2022-10-13T09:31:19.367Z",
            "updatedAt": "2022-10-13T09:31:19.367Z"
        }
    }
}