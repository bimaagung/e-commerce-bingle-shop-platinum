require('dotenv').config();
const UserUseCase =require ('../usecase/user')
const bcrypt = require('bcrypt')

const mockUserRepo = () =>{
    const repo = {}
    repo.loginUser = jest.fn().mockReturnValue({
        id : 1,
        name : "name test",
        username : "testusername",
        image : "testurlimage",
        email : "test@gmail.com",
        telp : "082315551",
        password : bcrypt.hashSync("123456", 10)
    })
    return repo
}
const repo = mockUserRepo()
userUC = new UserUseCase(repo)
// tes success login

describe('Auth test suite', function (){
    test('login success', async ()=>{
        let res = await userUC.login('testusername', "123456")
        expect(res.isSuccess).toEqual(true)
        expect(res.data === null).toEqual(false)
    })

    // tes failed login

    test('login failed', async ()=>{
        repo.loginUser = jest.fn().mockReturnValue(null)
        let res = await userUC.login('testusername', "123456")
        
        expect(res.isSuccess).toEqual(false)
        expect(res.message).toEqual('incorect username or password')
    })

    
})
