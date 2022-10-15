const userController = require('../../controller/user');
const resData = require('../../helper/response');

let mockUserUC = {
    getUserExist: jest.fn().mockReturnValue(null),
    getUserByID: jest.fn().mockReturnValue(null),
    updateUserProfile: jest.fn().mockReturnValue(null),
    updatePassword: jest.fn().mockReturnValue(null),
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

describe('Test User', () => {
    describe('getOneUser test', () => {

        const user = {
            name: 'user',
            username: 'user1',
            image: 'http://localhost:8080/images/user1.jpg',
            telp: '0847383672',
            email: 'user@example.com',
        }
        test('should status is 200 and type data is array', async () => {
              mockUserUC.getUserByID = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data: user, statusCode: 200}
            );
            
            let req = mockRequest({},{},{},{id:1},{ userUC: mockUserUC });
            let res = mockResponse();

             await userController.getOneUser(req, res, next);

            expect(mockUserUC.getUserByID).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success(user));
        });

        test('should status is 404 and message is "user not found"', async () => {
              mockUserUC.getUserByID = jest.fn().mockReturnValue(
                {isSuccess: false, reason:'user not found', data: null, statusCode: 404}
            );
            
            let req = mockRequest({},{},{},{id:2},{ userUC: mockUserUC });
            let res = mockResponse();

             await userController.getOneUser(req, res, next);

            expect(mockUserUC.getUserByID).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(404)
            expect(res.json).toBeCalledWith(resData.failed('user not found'));
        });

        test("should status is 500 and message is 'internal server error'", async () => {
            mockUserUC.getUserByID = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({},{},{},{id:1},{ userUC: mockUserUC });
            let res = mockResponse();
            let serverError = next();

            await userController.getOneUser(req, res, next);

            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });
    });

    describe('updateUser test', () => {

        const user = {
            name: 'user',
            username: 'user1',
            email: 'user@example.com',
            telp: '0847383672',
            
        }

        test('should status is 200', async () => {
              mockUserUC.updateUserProfile = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data: null, statusCode: 200}
            );
            
            let req = mockRequest(user,{},{},{id:1},{ userUC: mockUserUC });
            let res = mockResponse();

             await userController.updateUser(req, res, next);

            expect(mockUserUC.updateUserProfile).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success());
        });

        test('should status is 404 and message is "user not found"', async () => {
              mockUserUC.updateUserProfile = jest.fn().mockReturnValue(
                {isSuccess: false, reason:'user not found', data: null, statusCode: 404}
            );
            
            let req = mockRequest(user,{},{},{id:2},{ userUC: mockUserUC });
            let res = mockResponse();

             await userController.updateUser(req, res, next);

            expect(mockUserUC.updateUserProfile).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(404)
            expect(res.json).toBeCalledWith(resData.failed('user not found'));
        });
    });

    describe('updatePassword test', () => {

        const user = {
            password: '12345678',
            retypePassword: '12345678',
        }

        test('should status is 200', async () => {
              mockUserUC.updatePassword = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data: null, statusCode: 200}
            );
            
            let req = mockRequest(user,{},{},{id:1},{ userUC: mockUserUC });
            let res = mockResponse();

             await userController.updatePassword(req, res, next);

            expect(mockUserUC.updatePassword).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success());
        });

        test('should status is 404 and message is "user not found"', async () => {
              mockUserUC.updatePassword = jest.fn().mockReturnValue(
                {isSuccess: false, reason:'user not found', data: null, statusCode: 404}
            );
            
            let req = mockRequest(user,{},{},{id:2},{ userUC: mockUserUC });
            let res = mockResponse();

             await userController.updatePassword(req, res, next);

            expect(mockUserUC.updatePassword).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(404)
            expect(res.json).toBeCalledWith(resData.failed('user not found'));
        });

        test('should status is 400 and message is "password not match"', async () => {
              mockUserUC.updatePassword = jest.fn().mockReturnValue(
                {isSuccess: false, reason:'password not match', data: null, statusCode: 400}
            );
            
            let req = mockRequest({
                password: '12345678',
                retypePassword: '123456789',
            },{},{},{id:2},{ userUC: mockUserUC });
            let res = mockResponse();

             await userController.updatePassword(req, res, next);

            expect(mockUserUC.updatePassword).toHaveBeenCalled();
            expect(res.status).toBeCalledWith(400)
            expect(res.json).toBeCalledWith(resData.failed('password not match'));
        });
    });
});