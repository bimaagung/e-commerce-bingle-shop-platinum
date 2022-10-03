const orderController = require('../../controller/order');
const resData = require('../../helper/response')

let result = (isSuccess, reason, data) => { 
    return {
        isSuccess, 
        reason, 
        data
    }
}

let mockOrderUC = {
    getPendingOrderByUserId: jest.fn().mockReturnValue(null),
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

const next = (error) => {
    console.log(error.message);
}

describe('Test Order', () => { 
    describe('create order', () => {

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

        test('return should status is 200 and data is return true  ', async () => {
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

        test('return should status is 404 and message order not found  ', async () => {
            mockOrderUC.getPendingOrderByUserId = jest.fn().mockReturnValue(
                {isSuccess : false, reason: 'order not found', data:null}
               );

            let req = mockRequest({},{},{},{id:1},{ orderUC: mockOrderUC });
            let res = mockResponse();

            await orderController.getPendingOrderByUserId(req, res, next);

            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith(resData.failed('order not found'));
        });

    });
 })