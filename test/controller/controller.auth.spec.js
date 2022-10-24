const authController = require('../../controller/auth')
const resData = require('../../helper/response')
const urlImage = require('../../internal/constant/defaultImage')

let mockAuthUC = {
    login: jest.fn().mockReturnValue(null),
    register: jest.fn().mockReturnValue(null)
}

const mockRequest = (body = {}, params = {}, user = {}, file = {}, useCase = {}) => {
    return {
        body: body,
        params: params,
        user: user,
        file: file,
        ...useCase
    }
}

const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)

    return res
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

describe('test login', () => {
    describe('login success', () => {
        const user = {
            id: 9,
            name: "irvan",
            username: "irvan28",
            image: null,
            password: "password",
            telp: "082311113",
            is_admin: false,
            email: "irvan@gmail.com",
            createdAt: "2022-10-06T07:04:51.142Z",
            updatedAt: "2022-10-06T07:04:51.142Z"
        }


        test('return status 200 isSuccess true', async () => {
            mockAuthUC.login = jest.fn().mockReturnValue(
                { isSuccess: true, reason: "", data: user }
            )
            let req = mockRequest(
                { username: "irvan", password: "password" },
                {}, {}, {}, { authUC: mockAuthUC }
            )

            let res = mockResponse()

            await authController.login(req, res, next)

            expect(mockAuthUC.login).toHaveBeenCalled()
            expect(res.status).toBeCalledWith(200)

        })
        test('return status 404 isSuccess false', async () => {
            mockAuthUC.login = jest.fn().mockReturnValue(
                { isSuccess: false, reason: "username or password incorect", data: null }
            )
            let req = mockRequest(
                { username: "irvan", password: "password" },
                {}, {}, {}, { authUC: mockAuthUC }
            )

            let res = mockResponse()

            await authController.login(req, res, next)

            expect(mockAuthUC.login).toHaveBeenCalled()
            expect(res.json).toBeCalledWith(resData.failed("username or password incorect"))
        })

        test("should status is 500 and message is 'internal server error'", async () => {
            mockAuthUC.login = jest.fn().mockImplementation(() => {
                throw new Error();
            });

             let req = mockRequest(
                { username: "irvan", password: "password" },
                {}, {}, {}, { authUC: mockAuthUC }
            )
            let res = mockResponse();
            let serverError = next();

            await authController.login(req, res, next)
            
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });
    })
    describe('register success', () => {
        const user = {
            id: 9,
            name: "irvan",
            username: "irvan28",
            image: null,
            password: "password",
            telp: "082311113",
            is_admin: false,
            email: "irvan@gmail.com",
            
        }

        test('return status 200 isSuccess true', async () => {
            mockAuthUC.register = jest.fn().mockReturnValue(
                { isSuccess: true, reason: "", data: user }
            )
            let req = mockRequest(
                {},
                {},
                {},
                {},
                { authUC: mockAuthUC }
            )

            let res = mockResponse()

            await authController.register(req, res, next)

            expect(mockAuthUC.register).toHaveBeenCalled()
            expect(res.status).toBeCalledWith(200)
              
        })
        
        test('return status 404 isSuccess false', async () => {
            mockAuthUC.register = jest.fn().mockReturnValue(
                { isSuccess: false, reason: "", data: user, status: 404 }
            )
            let req = mockRequest(
                {},
                {},
                {},
                {},
                { authUC: mockAuthUC }
            )

            let res = mockResponse()

            await authController.register(req, res, next)

            expect(mockAuthUC.register).toHaveBeenCalled()
            expect(res.status).toBeCalledWith(404)
        })

        test("should status is 500 and message is 'internal server error'", async () => {
            mockAuthUC.register = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest(
                {},
                {},
                {},
                {},
                { authUC: mockAuthUC }
            )
            let res = mockResponse();
            let serverError = next();

            await authController.register(req, res, next)
            
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });

    })
})