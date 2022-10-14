const UserUseCase = require('../../usecase/user');
const mockUserRepo = require('../mock/repository.user.mock')

let userValues = {}
let userUC = null

describe('users', () => {
    beforeEach(() => {
        userValues = {
            returnGetUserExist: true,
            returnGetUserByID: true,
            returnUpdatePassword: true,
            returnUpdateUser: true
        }

        userUC = new UserUseCase(mockUserRepo(userValues));
  })
  
  describe('getUserExist test', () => { 

    test('should return true', async () => {
        let res = await userUC.getUserExist('user1','user@example.com');

        expect(typeof res === 'object').toBeTruthy();
        expect(res).toHaveProperty('name');
        expect(res).toHaveProperty('username');
        expect(res).toHaveProperty('image');
        expect(res).toHaveProperty('telp');
        expect(res).toHaveProperty('email');
    });

    test('should return null', async () => {
        userValues.returnGetUserExist = null
        userUC = new UserUseCase(mockUserRepo(userValues));
        let res = await userUC.getUserExist('user1','user@example.com');

        expect(res).toBeNull();
    });

   })

  describe('getUserByID test', () => { 

    test('should return true', async () => {
        let res = await userUC.getUserByID(1);

        expect(typeof res === 'object').toBeTruthy();
        expect(res).toHaveProperty('name');
        expect(res).toHaveProperty('username');
        expect(res).toHaveProperty('image');
        expect(res).toHaveProperty('telp');
        expect(res).toHaveProperty('email');
    });

    test('should return null', async () => {
        userValues.returnGetUserByID = null
        userUC = new UserUseCase(mockUserRepo(userValues));
        let res = await userUC.getUserByID(1);

        expect(res).toBeNull();
    });

   })

  describe('updateUserProfile test', () => { 

    test('should isSuccess is true', async () => {
        let res = await userUC.updateUserProfile(1);

        expect(res).toBeTruthy();
    });

    test('should return null', async () => {
        userValues.returnUpdateUser = null
        userUC = new UserUseCase(mockUserRepo(userValues));
        let res = await userUC.updateUserProfile(1);

        expect(res).toBeNull();
    });

   })


});