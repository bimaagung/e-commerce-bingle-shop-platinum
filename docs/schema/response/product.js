module.exports = {
    successGetImageByProductId: {
        "status": "ok",
        "message": "success",
        "data": [
            {
            "id": 1,
            "url": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg",
            "cover_image": true,
            "product_id": 1,
            "createdAt": "2022-10-21T11:36:16.082Z",
            "updatedAt": "2022-10-21T11:36:16.082Z"
            }
        ]
    },
    
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

    successGetProductById:{
        "status": "ok",
        "message": "success",
        "data": {
            "id": 1,
            "name": "Asus ROG Zephyrush M16",
            "description": "Laptop gaming dari asus",
            "category_id": 1,
            "sold": 3,
            "price": 30000000,
            "stock": 17,
            "cover_imageID": 1,
            "createdAt": "2022-10-21T11:36:16.349Z",
            "updatedAt": "2022-10-21T11:40:27.101Z",
            "ProductImages": [
            {
                "id": 1,
                "url": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg",
                "cover_image": true,
                "product_id": 1,
                "createdAt": "2022-10-21T11:36:16.082Z",
                "updatedAt": "2022-10-21T11:36:16.082Z"
            }
            ]
        }
    },

    productNotFound: {
        "status": "failed",
        "message": "product not found",
        "data": "null"
    },

     imageProductNotFound: {
        "status": "failed",
        "message": "image not found",
    },

    successAddProduct: {
        "status": "ok",
        "message": "success",
        "data": {
            "id": 40,
            "name": "Microsoft Surface Laptop Studio i7",
            "description": "Microsoft Surface Studio i7 Generation 11 with Ram 16GB, SSD 512GB, and RTX 3050",
            "category_id": 1,
            "sold": 0,
            "price": 34000000,
            "stock": 30,
            "updatedAt": "2022-10-18T03:01:09.630Z",
            "createdAt": "2022-10-18T03:01:09.630Z"
        }
    },

    categoryProductNotFound: {
        "status": "failed",
        "message": "failed to add, category not found",
        "data": "null"
    },
    successProduct: {
        "status": "ok",
        "message": "success"
    },
    imageProduct : {
        "status": "ok",
        "message": "success",
        "data": [
            {
            "id": 1,
            "url": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg",
            "product_id": 1,
            "createdAt": "2022-10-13T09:31:19.180Z",
            "updatedAt": "2022-10-13T09:31:19.180Z"
            }
        ]
    },
    addImageProduct: {
        "status": "ok",
        "message": "success",
        "data": {
            "id": 43,
            "url": "http://res.cloudinary.com/dnvltueqb/image/upload/v1666095182/product/1666095182744_flower_hzk1cc.jpg",
            "product_id": 9,
            "updatedAt": "2022-10-18T12:13:05.400Z",
            "createdAt": "2022-10-18T12:13:05.400Z"
        }
    },
    addImageNotFound:{
        "status": "failed",
        "message": "failed add image, product not found"
    }
}