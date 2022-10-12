const orderController = require('../../controller/order');
const resData = require('../../helper/response')

let mockOrderUC = {
    getPendingOrderByUserId: jest.fn().mockReturnValue(null),
    getListOrder: jest.fn().mockReturnValue(null),
    getPendingOrderByUserId: jest.fn().mockReturnValue(null),
    updateStatusOrder: jest.fn().mockReturnValue(null),
    updateOrderSubmitted: jest.fn().mockReturnValue(null),
}

const mockRequest = (body={}, query={}, params={}, user={}, useCases={}) => {
    return {
        body: body,
        query: query,
        params: params,
        user: user,
        ...useCases
    }
}

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
}

const next = () => jest.fn().mockReturnValue(
    {
        status: 500, 
        json:{
            status: 'failed',
            message: 'internal server error',
        }
    }
);


describe('Test Order', () => { 
    describe('createOrder test', () => {

        const order = {
            order_id: 1,
            products: [
                {
                    id: 10,
                    name: "ASUS ROG Phone 6 Pro 18/512Gb",
                    description: "Smarphone dari asus",
                    category_id: 2,
                    sold: 3,
                    price: 26500000,
                    stock: 7,
                    createdAt: "12-09-2022 23:30:00",
                    updatedAt: "12-09-2022 23:30:00",
                    ProductImage: [
                    {
                        id: 1,
                        url: null,
                        product_id: 10,
                        createdAt: "12-09-2022 23:30:00",
                        updatedAt: "12-09-2022 23:30:00",
                    },
                    ],
                },
            ],
        };

        test("should status is 201 and data is return true", async () => {
            mockOrderUC.createOrder = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data: order}
            );
            
            let req = mockRequest({products:[{id:1, qty:1}]},{},{},{id:1},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.createOrder(req, res, next);

            expect(mockOrderUC.createOrder).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(201)
            expect(res.json).toBeCalledWith(resData.success(order));
        });

        test("should status is 400 and message is 'user already has pending order'", async () => {
            mockOrderUC.createOrder = jest.fn().mockReturnValue(
                {isSuccess : false, reason: 'user already has pending order', data:null}
               );

            let req = mockRequest({products:[{id:1, qty:1}]},{},{},{id:1},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.createOrder(req, res, next);

            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith(resData.failed('user already has pending order'));
        });

         test("should status is 500 and message is 'internal server error'", async () => {
            mockOrderUC.createOrder = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({products:[{id:1, qty:1}]},{},{},{id:1},{ orderUC: mockOrderUC });
            let res = mockResponse();
            let serverError = next();

            await orderController.createOrder(req, res, next);
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });

    });

    describe('getPendingOrderByUserId test', () => {

        const order = {
                id: 1,
                status: 'PENDING',
                created_at: "2022-10-03T10:14:57.133Z",
                updated_at: "2022-10-03T10:14:57.133Z",
                products: [
                    {
                        "id": 106,
                        "name": "Rustic Plastic Bike",
                        "category": 1000,
                        "price": 100000,
                        "qty": 1,
                        "total_price": 100000
                    },
                ]
            
        };

        test("should status is 200 and data is return true", async () => {
            mockOrderUC.getPendingOrderByUserId = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data: order}
            );
            
            let req = mockRequest({},{},{},{id:1},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.getPendingOrderByUserId(req, res, next);

            expect(mockOrderUC.getPendingOrderByUserId).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success(order));
        });

        test("should status is 404 and message is 'order not found'", async () => {
            mockOrderUC.getPendingOrderByUserId = jest.fn().mockReturnValue(
                {isSuccess : false, reason: 'order not found', data:null}
               );

            let req = mockRequest({},{},{},{id:2},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.getPendingOrderByUserId(req, res, next);

            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith(resData.failed('order not found'));
        });

         test("should status is 500 and message is 'internal server error'", async () => {
            mockOrderUC.getPendingOrderByUserId = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({},{},{},{id:1},{ orderUC: mockOrderUC });
            let res = mockResponse();
            let serverError = next();

            await orderController.getPendingOrderByUserId(req, res, next);
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });

    });

    describe('getListOrder test', () => {

        const order = [
            {
                id: "Ti9jtWs0FHhJMAmS",
                user_id: 1,
                status: "PROCESSED",
                completed_date: null,
                createdAt: "12-09-2022 23:30:00",
                updatedAt: "12-09-2022 23:30:00",
            }
        ]

         test("should status is 200 and data is true", async() => {

            mockOrderUC.getListOrder = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data: order}
            );

            let req = mockRequest({},{},{},{},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.getListOrder(req, res, next);

            expect(mockOrderUC.getListOrder).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success(order));

        });

        test("with query should status is 200 and data is true", async() => {

            mockOrderUC.getListOrder = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data: order}
            );

            let req = mockRequest({},{status:'PROCESSED'},{},{},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.getListOrder(req, res, next);

            expect(mockOrderUC.getListOrder).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success(order));

        });

        test("should status is 200 and data is empty", async() => {
            mockOrderUC.getListOrder = jest.fn().mockReturnValue(
                {isSuccess: false, reason:null, data: []}
            );

            let req = mockRequest({},{},{},{},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.getListOrder(req, res, next);

            expect(mockOrderUC.getListOrder).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success([]));
        });

        test("should status is 500 and message is 'internal server error'", async () => {
            mockOrderUC.getListOrder = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({},{},{},{},{ orderUC: mockOrderUC });
            let res = mockResponse();
            let serverError = next();

            await orderController.getListOrder(req, res, next);
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });
    })

    describe('getPendingOrderByUserId test', () => {

        const order = [
            {
                id: "Ti9jtWs0FHhJMAmS",
                user_id: 1,
                status: "PROCESSED",
                completed_date: null,
                createdAt: "12-09-2022 23:30:00",
                updatedAt: "12-09-2022 23:30:00",
            }
        ]

        test('should status is 200 and data is true', async() => {

            mockOrderUC.getPendingOrderByUserId = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data: order}
            );

            let req = mockRequest({},{},{},{id:1},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.getPendingOrderByUserId(req, res, next);

            expect(mockOrderUC.getPendingOrderByUserId).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success(order));

        });

        test(`should status is 404 and reason is "order not found"`, async() => {
             mockOrderUC.getPendingOrderByUserId = jest.fn().mockReturnValue(
                {isSuccess: false, reason:'order not found', data: order}
            );

            let req = mockRequest({},{},{},{id:2},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.getPendingOrderByUserId(req, res, next);

            expect(mockOrderUC.getPendingOrderByUserId).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(404)
            expect(res.json).toBeCalledWith(resData.failed('order not found'));
        });

         test("should status is 500 and message is 'internal server error'", async () => {
            mockOrderUC.getPendingOrderByUserId = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({},{},{},{id:1},{ orderUC: mockOrderUC });
            let res = mockResponse();
            let serverError = next();

            await orderController.getPendingOrderByUserId(req, res, next);
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });
    })

    describe('changeStatusOrder test', () => {

        test('should status is 200 and data is true', async() => {

            mockOrderUC.updateStatusOrder = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data: true, statusCode:200}
            );

            let req = mockRequest({status: "ORDER_COMPLETED"},{},{id:1},{},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.changeStatusOrder(req, res, next);

            expect(mockOrderUC.updateStatusOrder).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success());

        });

        test(`should status is 404 and reason is "orders without pending status not found"`, async() => {
             mockOrderUC.updateStatusOrder = jest.fn().mockReturnValue(
                {isSuccess: false, reason:'orders without pending status not found', data: null, statusCode: 404}
            );

            let req = mockRequest({status: "ORDER_COMPLETED"},{},{id:2},{},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.changeStatusOrder(req, res, next);

            expect(mockOrderUC.updateStatusOrder).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(404)
            expect(res.json).toBeCalledWith(resData.failed('orders without pending status not found'));
        });

          test(`should status is 400 and reason is "request status outside the specified options"`, async() => {
             mockOrderUC.updateStatusOrder = jest.fn().mockReturnValue(
                {isSuccess: false, reason:'request status outside the specified options', data: null, statusCode: 400}
            );

            let req = mockRequest({status: "ORDER_LOADING"},{},{id:3},{},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.changeStatusOrder(req, res, next);

            expect(mockOrderUC.updateStatusOrder).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(400)
            expect(res.json).toBeCalledWith(resData.failed('request status outside the specified options'));
        });

          test("should status is 500 and message is 'internal server error'", async () => {
            mockOrderUC.updateStatusOrder = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({status: "ORDER_COMPLETED"},{},{id:1},{},{ orderUC: mockOrderUC });
            let res = mockResponse();
            let serverError = next();

            await orderController.changeStatusOrder(req, res, next);
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });
    })

    describe('submitOrder test', () => {

        test('should status is 200 and data is true', async() => {

            mockOrderUC.updateOrderSubmitted = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data: null, statusCode: 200}
            );

            let req = mockRequest({},{},{},{id:1},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.submitOrder(req, res, next);

            expect(mockOrderUC.updateOrderSubmitted).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success());

        });

        test(`should status is 404 and reason is "order not found"`, async() => {
             mockOrderUC.updateOrderSubmitted = jest.fn().mockReturnValue(
                {isSuccess: false, reason:'order not found', data: null, statusCode: 404}
            );

            let req = mockRequest({},{},{},{id:2},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.submitOrder(req, res, next);

            expect(mockOrderUC.updateOrderSubmitted).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(404)
            expect(res.json).toBeCalledWith(resData.failed('order not found'));
        });

         test(`should status is 400 and reason is "recheck the product, make sure the product is still in stock"`, async() => {
             mockOrderUC.updateOrderSubmitted = jest.fn().mockReturnValue(
                {isSuccess: false, reason:'order not found', data: null, statusCode: 400}
            );

            let req = mockRequest({},{},{},{id:3},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.submitOrder(req, res, next);

            expect(mockOrderUC.updateOrderSubmitted).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(400)
            expect(res.json).toBeCalledWith(resData.failed('order not found'));
        });

         test("should status is 500 and message is 'internal server error'", async () => {
            mockOrderUC.updateOrderSubmitted = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({},{},{},{id:1},{ orderUC: mockOrderUC });
            let res = mockResponse();
            let serverError = next();

            await orderController.submitOrder(req, res, next);
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });
    })
 })