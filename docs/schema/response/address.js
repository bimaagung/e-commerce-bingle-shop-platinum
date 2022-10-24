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
            "id": 5,
            "province": "Jakarta",
            "city": "Jakarta",
            "postal_code": "12940",
            "detail": "Jl. Setiabudi, Kuningan, Jakarta Selatan",
            "user_id": 4,
            "main_address": false,
            "createdAt": "2022-10-22T03:29:24.202Z",
            "updatedAt": "2022-10-22T03:29:31.904Z"
            },
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