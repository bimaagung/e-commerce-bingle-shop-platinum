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
        "name": "Laptop",
        "createdAt": "2022-10-21T11:36:16.277Z",
        "updatedAt": "2022-10-21T11:36:16.277Z",
        "products": [
            {
                "id": 2,
                "name": "Macbook pro M2",
                "description": "Laptop gaming dari apple",
                "category_id": 1,
                "sold": 0,
                "price": 25000000,
                "stock": 30,
                "cover_imageID": 2,
                "createdAt": "2022-10-21T11:36:16.349Z",
                "updatedAt": "2022-10-21T11:36:16.349Z"
            }
            ]
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