module.exports = {
    successGetAllCategory : {
        "status": "ok",
        "message": "success",
        "data": [
            {
                "id": 1,
                "name": "Camera",
                "createdAt": "2022-10-13T09:31:19.311Z",
                "updatedAt": "2022-10-13T09:31:19.311Z"
            },
        ]
    },
    successGetCategoryById: {
        "status": "ok",
        "message": "success",
        "data": {
            "id": 1,
            "name": "Camera",
            "createdAt": "2022-10-13T09:31:19.311Z",
            "updatedAt": "2022-10-13T09:31:19.311Z"
        }
    },
    categoryNotFound: {
        "status": "failed",
        "message": "category not found",
        "data": "null"
    },
    successCategory: {
        "status": "ok",
        "message": "success",
    }
}