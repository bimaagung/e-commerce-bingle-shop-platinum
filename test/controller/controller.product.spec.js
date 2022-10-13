const productController = require('../../controller/product')
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
    res.json = jest.fn().mockReturnValue(res)

    return res
}

const next = (error) => {
    console.log(error.message)
}

describe('Test Product', () => {
    describe('get all products', () => {

        const product = [
            {
                id: 1,
                name: 'Iphone 13 Pro',
                description: 'Smartphone dari apple',
                category_id: 1,
                sold: 10,
                price: 25000000,
                stock: 10,
                image: null,
                createdAt: "12-09-2022 23:30:00",
                updatedAt: "12-09-2022 23:30:00",       
            }
        ]
        test('should status 200 and data in array', async () => {
            mockProductUC.getAllProducts = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data:product}
            )
            let req = mockRequest({},{},{},{},{ productUC:mockProductUC })
            let res = mockResponse()

            await productController.getAllProducts(req, res, next)

            expect(mockProductUC.getAllProducts).toHaveBeenCalled()
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success(product))
        })   

        test('should status 200 and data empty', async() => {
            mockProductUC.getAllProducts = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data:[]}
            )
            let req = mockRequest({},{},{},{},{ productUC: mockProductUC })
            let res = mockResponse()
            
            await productController.getAllProducts(req, res, next)

            expect(mockProductUC.getAllProducts).toHaveBeenCalled()
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success([]))
        })
        
    })

    describe('get product by Id', () => {

        const product = [
            {
                id: 1,
                name: 'Iphone 13 Pro',
                description: 'Smartphone dari apple',
                category_id: 1,
                sold: 10,
                price: 25000000,
                stock: 10,
                image: null,
                createdAt: "12-09-2022 23:30:00",
                updatedAt: "12-09-2022 23:30:00",       
            }
        ]

        test('should status 200 and data is object', async () => {
            mockProductUC.getProductById = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data:product}
            )
        
            let req = mockRequest({},{},{id:1},{},{ productUC: mockProductUC })
            let res = mockResponse()

            await productController.getProductById(req, res, next)
            

            expect(mockProductUC.getProductById).toHaveBeenCalled()
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success(product))
        })

        test('should status 404 and message is product not found', async () => {
            mockProductUC.getProductById = jest.fn().mockReturnValue(
                {isSuccess: false, reason: 'product not found', data:null}
            )
        })
        let req = mockRequest({},{},{},{id:2},{ productUC: mockProductUC})
        let re = mockResponse()

        await productController.getProductById(req, res, next)

        expect(res.status).toBeCalledWith(404)
        expect(res.json).toBeCalledWith(resData.failed('product not found'))
    })
    
})