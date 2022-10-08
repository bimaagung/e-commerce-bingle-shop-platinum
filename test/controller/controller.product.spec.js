const { DESCRIBE } = require('sequelize/types/query-types')
const productUseCase = require('../../controller/product')
const resData = require('../../helper/response')

let mockProductUC = {
    getProductByID: jest.fn().mockReturnValue(null),
    updateProduct: jest.fn().mockReturnValue(null),
    getAllProducts: jest.fn().mockReturnValue(null),
    addProduct: jest.fn().mockReturnValue(null),
    deleteProduct: jest.fn().mockReturnValue(null),
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
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    resData.json = jest.fn().mockReturnValue(res)

    return res
}

const next = (error) => {
    console.log(error.message)
}

describe('Test Product', () => {
    describe('get all products', () => {

        const product = {
            
        }
    })
})