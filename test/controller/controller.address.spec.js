const addressController = require('../../controller/address_controller');
const resData = require('../../helper/response');

let mockAddressUC = {
    addAddress: jest.fn().mockReturnValue(null),
    getAddressById: jest.fn().mockReturnValue(null),
    getAllAddress: jest.fn().mockReturnValue(null),
    updateAddress: jest.fn().mockReturnValue(null),
    deleteAddress: jest.fn().mockReturnValue(null),
}