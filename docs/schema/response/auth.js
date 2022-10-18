module.exports = {
    successRegister : {
        "status": "ok",
        "message": "success",
        "data": {
            "user": {
            "id": 72,
            "name": "Customer B",
            "username": "customer_b",
            "image": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815145/default%20image/profile_xzrsh7.png",
            "telp": "083637267",
            "email": "customerb@gmail.com",
            "is_admin": false,
            "updatedAt": "2022-10-18T02:01:39.871Z",
            "createdAt": "2022-10-18T02:01:39.871Z"
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzIsIm5hbWUiOiJDdXN0b21lciBCIiwidXNlcm5hbWUiOiJjdXN0b21lcl9iIiwiZW1haWwiOiJjdXN0b21lcmJAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE2NjYwNTg0OTksImV4cCI6MTY2NjA4MDA5OX0.TbD6tj-2S_gFWyERrlFHukuNak55csfeal3gmfdGYhg"
        }
    },

    notAvailable: {
        "status": "failed",
        "message": "username or email not aviable"
    },

    passwordNotMatch: {
        "status": "failed",
        "message": "password and confrim password not match"
    }
}