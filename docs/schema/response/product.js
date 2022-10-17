module.exports = {
    successGetAllProduct: {
        "status": "ok",
        "message": "success",
        "data": [
            {
                "id": 1,
                "name": "Asus ROG Zephyrush M16",
                "description": "Laptop gaming dari asus",
                "category_id": 1,
                "sold": 23,
                "price": 30000000,
                "stock": 0,
                "createdAt": "2022-10-13T09:31:19.370Z",
                "updatedAt": "2022-10-17T06:48:59.632Z",
                "ProductImages": [
                    {
                    "id": 1,
                    "url": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg"
                    }
                ]
            },
        ]
    },

    successGetProductById: {
        "status": "ok",
        "message": "success",
        "data": {
            "id": 1,
            "name": "Asus ROG Zephyrush M16",
            "description": "Laptop gaming dari asus",
            "category_id": 1,
            "sold": 23,
            "price": 30000000,
            "stock": 0,
            "createdAt": "2022-10-13T09:31:19.370Z",
            "updatedAt": "2022-10-17T06:48:59.632Z",
            "ProductImages": [
                {
                    "id": 1,
                    "url": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg"
                }
            ]
        }
    },

    productNotFound: {
        "status": "failed",
        "message": "product not found",
        "data": "null"
    }
}