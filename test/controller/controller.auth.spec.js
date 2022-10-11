const authController = require('../../controller/auth')
const resData = require('../../helper/response')
const bcrypt = require('bcrypt')

let mockAuthUC = {
    login: jest.fn().mockReturnValue(null),
    register: jest.fn().mockReturnValue(null)
}

const mockRequest = (body = {}, params = {}, user = {}, useCase = {}) => {
    return {
        body: body,
        params: params,
        user: user,
        ...useCase
    }
}

const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)

    return res
}
const next = (error) => {
    console.log(error.message)
}

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
                {}, {}, { authUC: mockAuthUC }
            )

            let res = mockResponse()

            await authController.login(req, res, next)

            expect(mockAuthUC.login).toHaveBeenCalled()
            expect(res.status).toBeCalledWith(200)
        })
        test('return status 404 isSucces false', async () => {
            mockAuthUC.login = jest.fn().mockReturnValue(
                { isSuccess: false, reason: "username or email not aviable", data: null }
            )
            let req = mockRequest(
                { username: "worngUsername", password: "wrongPassword" },
                {}, {}, { authUC: mockAuthUC }
            )
            let res = mockResponse()
            await authController.login(req, res, next)

            expect(mockAuthUC.login).toHaveBeenCalled()
            expect(res.json).toBeCalledWith(resData.failed('username or email not aviable'));
        })
    })
    describe('test register', () => {
        describe('register success', () => {
            const user = {
                name: "irvan",
                username: "irvan28",
                image: null,
                password: bcrypt.hashSync('123456', 10),
                telp: "082311113",
                is_admin: false,
                email: "irvan@gmail.com",
            }
            test('return status 200 isSuccess true', async () => {
                mockAuthUC.register = jest.fn().mockReturnValue(
                    { isSuccess: true, reason: "", data: user }
                )
                let req = mockRequest(
                    {
                        name: "irvan",
                        username: "irvan28",
                        image: null,
                        password: bcrypt.hashSync('123456', 10),
                        telp: "082311113",
                        is_admin: false,
                        email: "irvan@gmail.com"
                    },
                    {}, {}, { authUC: mockAuthUC }
                )

                let res = mockResponse()
                console.log(res)

                await authController.register(req, res, next)

                // expect(mockAuthUC.register).toHaveBeenCalled()
                expect(res.status).toBeCalledWith(200)
            })
        })
    })
})



