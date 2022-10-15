//const { query } = require('express')
//  const category = require('../../controller/category')
const categoryController = require ('../../controller/category')
const resData = require('../../helper/response')

let mockCategoryUC = {
    getCategoryByID: jest.fn().mockReturnValue(null),
    putCategory: jest.fn().mockReturnValue(null),
    getAllCategory: jest.fn().mockReturnValue(null),
    addCategory: jest.fn().mockReturnValue(null),
    deleteCategory: jest.fn().mockReturnValue(null),  
}

const mockRequest = (body={}, query={}, params={},  user={}, useCases={}) => {
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

describe('Test Category', () => {
    describe('get all category', () => {
        
        const Category = [
            {
                id: "1",
                name: "celana",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]

    test('sholud status 200 data in category'), async () => {
        mockCategoryUC.getAllCategory = jest.fn().mockReturnValue(
            {isSuccess: true, reason:null, data:Category}
        )
        let req = mockRequest({},{},{},{},{ categoryUC: mockCategoryUC })
        let res = mockResponse()

        await categoryController.getAllCategory(req, res, next)

        expect(mockCategoryUC.getAllCategory).toHaveBeenCalled()
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(resData.success(Category))
    }
    
    test('should status 200 and data empty', async() => {
        mockCategoryUC.getAllCategory = jest.fn().mockReturnValue(
            {isSuccess: true, reason:null, data:[]}
        )
        let req = mockRequest({},{},{},{},{ categoryUC: mockCategoryUC})
        let res = mockResponse()
        
        await categoryController.getAllCategory(req, res, next)

        expect(mockCategoryUC.getAllCategory).toHaveBeenCalled()
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(resData.success([]))
        })
    })
})
