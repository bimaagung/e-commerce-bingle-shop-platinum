module.exports = {
    successAddAddress: {
        "status": "ok",
        "message": "success",
        "data": {
            "id": 33,
            "province": "Jakarta",
            "city": "Jakarta",
            "postal_code": "12940",
            "detail": "Jl. Setiabudi, Kuningan, Jakarta Selatan",
            "user_id": 61,
            "updatedAt": "2022-10-17T10:22:27.508Z",
            "createdAt": "2022-10-17T10:22:27.508Z"
        }
    },
    successGetAllAdressByUserId: {
        "status": "ok",
        "message": "success",
        "data": [
            {
            "id": 33,
            "province": "Jakarta",
            "city": "Jakarta",
            "postal_code": "12940",
            "detail": "Jl. Setiabudi, Kuningan, Jakarta Selatan",
            "user_id": 61,
            "createdAt": "2022-10-17T10:22:27.508Z",
            "updatedAt": "2022-10-17T10:22:27.508Z"
            }
        ]
    },
    addressNotFound: {
        "status": "failed",
        "message": "address not found"
    },
    sucessAddress: {
        "status": "ok",
        "message": "success"
    }

}