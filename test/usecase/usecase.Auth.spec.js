require('dotenv').config();
const bcrypt = require('bcrypt')
const authUseCase = require('../../usecase/auth')
const mockAuthRepo = require('../mock/repository.auth.mock')
const mockUserRepo = require('../mock/repository.user.mock')
const urlImage = require('../../internal/constant/defaultImage')

let authValues, userValues = {}
let authUC= null

describe('auth', ()=>{
    beforeEach(()=>{
        authValues = {
        returnRegisterUser : true,
        returnLoginUser : true
        }
        userValues = {
        returnGetUserExist : true
        }
        authUC = new authUseCase(
            mockAuthRepo(authValues),
            mockUserRepo(userValues)
            )
    })
    describe('Login', ()=>{
        test("isSuccess = true Login success",async ()=>{
            let res = await authUC.login({
            username: "testusername",
            password: bcrypt.hashSync('123456', 10)
            })
            expect(res.isSuccess).toBeTruthy()
            expect(res.data === null).toEqual(false)
        })
        test("isSuccess = false login failed", async ()=>{
            authValues.returnLoginUser = null
            authUC = new authUseCase(mockAuthRepo(authValues))
            let res = await authUC.login({
            username: "testusername",
            password: bcrypt.hashSync('123456', 10)
            })
            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual("incorect username or password")
        })
    })
    describe('register', ()=>{
        test("isSucces = true Registes success", async ()=>{
            userValues.returnGetUserExist = null
            authUC = new authUseCase(
                mockAuthRepo(authValues),
                mockUserRepo(userValues)
                )
            let res = await authUC.register({
            id: 1,
            name: "test",
            image: urlImage.DEFAULT_AVATAR,
            username: "testusername",
            email: "test@email.com",
            password: bcrypt.hashSync('123456', 10)
            })
            expect(res.isSuccess).toBeTruthy()
            expect(res.data === null).toEqual(false)
        })
        test("isSucces = false data exist", async ()=>{
            let res = await authUC.register({
            id: 1,
            name: "test",
            image: "url_image",
            username: "testusername",
            email: "test@email.com",
            password: bcrypt.hashSync('123456', 10)
            })
            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual("username or email not aviable")
        })
    })

})