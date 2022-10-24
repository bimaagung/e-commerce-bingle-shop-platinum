const addressController = require('../../controller/address');
const resData = require('../../helper/response');

let mockAddressUC = {
    getAddressByUserID: jest.fn().mockReturnValue(null),
    getAddressByID: jest.fn().mockReturnValue(null),
    addAddress: jest.fn().mockReturnValue(null),
    updateAddress: jest.fn().mockReturnValue(null),
    deleteAddress: jest.fn().mockReturnValue(null),
};

const mockRequest = (body = {}, query = {}, params = {}, user = {}, useCases = {}) => {
    return {
        body: body,
        query: query,
        params: params,
        user: user,
        ...useCases
    }
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
};

const next = () => jest.fn().mockReturnValue(
    {
        status: 500, 
        json:{
            status: 'failed',
            message: 'internal server error',
        }
    }
);


describe('Test Address', () => {
    describe('get all address test', () => {
        const address = [
            {
                id: 1,
                province: 'Banten',
                city: 'Bumi Serpong',
                postal_code: '15345',
                detail: 'The Breeze BSD',
                user_id: 2,
                main_address: true,
                createdAt: "12-09-2022 23:30:00",
                updatedAt: "12-09-2022 23:30:00"
            }
        ]

        test("should status 200 and data in array", async () => {
            mockAddressUC.getAddressByUserID = jest.fn().mockReturnValue(
                { isSuccess: true, reason: null, data: address, status: 200 }
            );

            let req = mockRequest({}, {}, { id: 2 }, {}, { addressUC: mockAddressUC });
            let res = mockResponse();

            await addressController.getAddressByUserID(req, res, next);

            expect(mockAddressUC.getAddressByUserID).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success(address));
        });

        test('should status 200 and data empty', async () => {
            mockAddressUC.getAddressByUserID = jest.fn().mockReturnValue(
                { isSuccess: true, reason: null, data: [], status: 200 }
            )
            let req = mockRequest({}, {}, {}, {}, { addressUC: mockAddressUC })
            let res = mockResponse()

            await addressController.getAddressByUserID(req, res, next)

            expect(mockAddressUC.getAddressByUserID).toHaveBeenCalled()
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success([]))
        })

         test("should status is 500 and message is 'internal server error'", async () => {
            mockAddressUC.getAddressByUserID = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({},{},{},{id:1},{ addressUC: mockAddressUC });
            let res = mockResponse();
            let serverError = next();

            await addressController.getAddressByUserID(req, res, next)

            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });
    })

    describe('delete address ', () => {

        const address =
        {
            id: 1,
            province: 'Banten',
            city: 'Bumi Serpong',
            postal_code: '15345',
            detail: 'The Breeze BSD',
            user_id: 2,
            main_address: true,
            createdAt: "12-09-2022 23:30:00",
            updatedAt: "12-09-2022 23:30:00"
        }

        test('should status 200 and data is object', async () => {
            mockAddressUC.deleteAddress = jest.fn().mockReturnValue(
                { isSuccess: true, reason: null, data: address, status: 200 })

            let req = mockRequest({}, {}, { id: 1 }, {}, { addressUC: mockAddressUC })
            let res = mockResponse()

            await addressController.deleteAddress(req, res, next)


            expect(mockAddressUC.deleteAddress).toHaveBeenCalled()
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success())
        })


        test('should status 404 and message is address not found', async () => {
            mockAddressUC.deleteAddress = jest.fn().mockReturnValue(
                { isSuccess: false, reason: 'address not found', data: null, status: 404 })

            let req = mockRequest({}, {}, { id: 2 }, {}, { addressUC: mockAddressUC })
            let res = mockResponse()

            await addressController.deleteAddress(req, res, next)

            expect(res.status).toBeCalledWith(404)
            expect(res.json).toBeCalledWith(resData.failed('address not found'))
        })

        test("should status is 500 and message is 'internal server error'", async () => {
            mockAddressUC.deleteAddress = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({},{},{},{id:2},{ addressUC: mockAddressUC });
            let res = mockResponse();
            let serverError = next();

            await addressController.deleteAddress(req, res, next)
            
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });
    })

    describe('create address ', () => {

        const address =
        {
            id: 1,
            province: 'Banten',
            city: 'Bumi Serpong',
            postal_code: '15345',
            detail: 'The Breeze BSD',
            user_id: 2,
            main_address: true,
            createdAt: "12-09-2022 23:30:00",
            updatedAt: "12-09-2022 23:30:00"
        }

        test('should status 201 and data is object', async () => {
            mockAddressUC.addAddress = jest.fn().mockReturnValue(
                { isSuccess: true, reason: null, data: address, status: 201 })

            let req = mockRequest({ address }, {}, {}, {}, { addressUC: mockAddressUC })
            let res = mockResponse()

            await addressController.addAddress(req, res, next)


            expect(mockAddressUC.addAddress).toHaveBeenCalled()
            expect(res.status).toBeCalledWith(201)
            expect(res.json).toBeCalledWith(resData.success(address))
        })

        test('should status 404 and message is address not found', async () => {
            mockAddressUC.addAddress = jest.fn().mockReturnValue(
                { isSuccess: false, reason: 'failed to add, address not found', data: null, status: 404 })

            let req = mockRequest({ address }, {}, {}, {}, { addressUC: mockAddressUC })
            let res = mockResponse()

            await addressController.addAddress(req, res, next)

            expect(res.status).toBeCalledWith(404)
            expect(res.json).toBeCalledWith(resData.failed('failed to add, address not found', null))
        })

        test("should status is 500 and message is 'internal server error'", async () => {
            mockAddressUC.addAddress = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({},{},{},{id:2},{ addressUC: mockAddressUC });
            let res = mockResponse();
            let serverError = next();

            await addressController.addAddress(req, res, next)
            
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });
    })
})
