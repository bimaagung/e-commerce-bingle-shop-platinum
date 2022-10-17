module.exports = {
    successCreateOrder: {
        "status": "ok",
        "message": "success",
        "data": {
            "order_id": "bQ660uV5EW6vSXe-",
            "products": [
            {
                "id": 1,
                "name": "Asus ROG Zephyrush M16",
                "description": "Laptop gaming dari asus",
                "category_id": 1,
                "sold": 20,
                "price": 30000000,
                "stock": 10,
                "createdAt": "2022-10-13T09:31:19.370Z",
                "updatedAt": "2022-10-14T04:51:49.715Z",
                "ProductImages": [
                {
                    "id": 1,
                    "url": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg"
                }
                ]
            }
            ]
        }
    },
    haveOrderPending : {
        "status": "failed",
        "message": "user already has pending order"
    },
    checkProductOrder : {
        "status": "failed",
        "message": "can't process the order, please check each product in order"
    },
    successGetOrderPending: {
        "status": "ok",
        "message": "success",
        "data": {
            "id": "bQ660uV5EW6vSXe-",
            "status": "PENDING",
            "created_at": "2022-10-17T05:28:32.419Z",
            "updated_at": "2022-10-17T05:28:32.419Z",
            "qty": 3,
            "total_price": 90000000,
            "user": {
            "id": 61,
            "name": "Bima",
            "username": "bima",
            "telp": "08554637"
            },
            "products": [
            {
                "id": 1,
                "name": "Asus ROG Zephyrush M16",
                "category": "Laptop",
                "price": 30000000,
                "qty": 3,
                "total_price": 90000000
            }
            ]
        }
    },
    successOrder : {
        "status": "ok",
        "message": "success"
    },
    orderNotFound: {
        "status": "failed",
        "message": "order not found"
    },
    unathorized: {
        "status": "failed",
        "message": "unauthorized"
    },
    checkProductOrderBeforeSumbit: {
        "status": "failed",
        "message": "recheck the product, make sure the product is still in stock"
    }
}