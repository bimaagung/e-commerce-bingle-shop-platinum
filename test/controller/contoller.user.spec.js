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