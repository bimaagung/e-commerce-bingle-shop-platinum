const authController = require('../../controller/auth')
const resData = require('../../helper/response')

let mockAuthUC = {
    login: jest.fn().mockReturnValue(null),
    register : jest.fn().mockReturnValue(null)
}

const mockRequest = (body={}, params={}, user={}, useCase={})=>{
    return {
        body : body,
        params : params,
        user : user,
        ...useCase
    }
}

const mockResponse = ()=>{
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)

    return res
}
const next = (error)=>{
    console.log(error.message)
}

describe('test login', ()=>{
    describe('login success', ()=>{
        const user = {
            id: 9,
            name: "irvan",
            username: "irvan28",
            image: null,
            password : "password",
            telp: "082311113",
            is_admin: false,
            email: "irvan@gmail.com",
            createdAt: "2022-10-06T07:04:51.142Z",
            updatedAt: "2022-10-06T07:04:51.142Z"
        }

        
        test('return status 200 isSuccess true', async ()=>{
            mockAuthUC.login = jest.fn().mockReturnValue(
                {isSuccess: true, reason:"", data : user}
            )
            let req = mockRequest(
                {username : "irvan", password :"password"},
                {},{},{authUC : mockAuthUC}
                )

            let res = mockResponse()

            await authController.login(req, res, next)
            
            expect(mockAuthUC.login).toHaveBeenCalled()
            expect(res.status).toBeCalledWith(200)
    })
    })
})



