const categoryController = require ('../../controller/category')
const resData = require('../../helper/response')

let mockCategoryUC = {
    getCategoryByID: jest.fn().mockReturnValue(null),
    updateCategory: jest.fn().mockReturnValue(null),
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

const next = () => jest.fn().mockReturnValue(
    {
        status: 500, 
        json:{
            status: 'failed',
            message: 'internal server error',
        }
    }
);


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

    test('sholud status 200 data in category', async () => {
        mockCategoryUC.getAllCategory = jest.fn().mockReturnValue(
            {isSuccess: true, reason:null, data:Category}
        )
        let req = mockRequest({},{},{},{},{ categoryUC: mockCategoryUC })
        let res = mockResponse()

        await categoryController.getAllCategory(req, res, next)

        expect(mockCategoryUC.getAllCategory).toHaveBeenCalled()
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(resData.success(Category))
    })
    
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

    test("should status is 500 and message is 'internal server error'", async () => {
        mockCategoryUC.getAllCategory = jest.fn().mockImplementation(() => {
            throw new Error();
        });

        let req = mockRequest({},{},{},{},{ categoryUC: mockCategoryUC})
        let res = mockResponse();
        let serverError = next();

        await categoryController.getAllCategory(req, res, next)
        
        expect(serverError().status).toEqual(500);
        expect(serverError().json.message).toEqual('internal server error');
    });

    })

    describe('get category by Id', () => {

        const category = 
        {
            id: "1",
            name: "laptop",
            createdAt: new Date(),
            updatedAt: new Date(),
            products: [{
                id: 1,
                name: 'Asus ROG Zephyrush M16',
                describe: 'Laptop dari asus',
                category_id:1,
                sold:10,
                price: 34000000,
                stock: 5,
                image: [
                    {
                        id:1, url:'https://cloudinary.com/avatars/image.jpg'
                    }
                ],
                createdAt: new Date(),
                updatedAt: new Date(),
            }]
        }
        
    

        test('should status 200 and data is object', async () => {
            mockCategoryUC.getCategoryByID = jest.fn().mockReturnValue(
                {isSuccess: true, reason: null, data: category})
        
            let req = mockRequest({},{},{id:1},{},{ categoryUC: mockCategoryUC })
            let res = mockResponse()

            await categoryController.getCategoryById(req, res, next)
            

            expect(mockCategoryUC.getCategoryByID).toHaveBeenCalled()
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success(category))
        })
    

        test('should status 404 and message is category not found', async () => {
            mockCategoryUC.getCategoryByID = jest.fn().mockReturnValue(
                {isSuccess: false, reason: 'category not found', data:null})
        
            let req = mockRequest({},{},{id:2},{},{ categoryUC: mockCategoryUC})
            let res = mockResponse()

             await categoryController.getCategoryById(req, res, next)

            expect(res.status).toBeCalledWith(404)
            expect(res.json).toBeCalledWith(resData.failed('category not found', null))
        })

        test("should status is 500 and message is 'internal server error'", async () => {
            mockCategoryUC.getCategoryByID = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({},{},{id:2},{},{ categoryUC: mockCategoryUC})
            let res = mockResponse();
            let serverError = next();

            await categoryController.getCategoryById(req, res, next)
            
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });
    })

    describe('add category', () => {

        const category = 
        {
            id: "1",
            name: "laptop",
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        
        
        let categoryBody = 
            {
                name: "Iphone 13 Pro",
            }

            
        test('should status 200 and data is object', async () => {
            mockCategoryUC.addCategory = jest.fn().mockReturnValue(
                {isSuccess: true, reason:null, data:category})
            
                let req = mockRequest(categoryBody,{},{},{},{ categoryUC: mockCategoryUC })
                let res = mockResponse()
    
                await categoryController.addCategory(req, res, next)
                
    
                expect(mockCategoryUC.addCategory).toHaveBeenCalled()
                expect(res.status).toBeCalledWith(201)
                expect(res.json).toBeCalledWith(resData.success(category))
            })
    
        test('should status 404 and message is failed add category', async () => {
             mockCategoryUC.addCategory = jest.fn().mockReturnValue(
                {isSuccess: false, reason: 'failed add category', data:null})
            
                let req = mockRequest(categoryBody,{},{},{},{ categoryUC: mockCategoryUC})
                let res = mockResponse()
        
                await categoryController.addCategory(req, res, next)
        
                expect(res.status).toBeCalledWith(404)
                expect(res.json).toBeCalledWith(resData.failed('failed add category', null))
        })

        test("should status is 500 and message is 'internal server error'", async () => {
            mockCategoryUC.addCategory = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest(categoryBody,{},{},{},{ categoryUC: mockCategoryUC})
            let res = mockResponse();
            let serverError = next();

            await categoryController.addCategory(req, res, next)
            
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });
    })

     describe('update category', () => {

        
        const categoryBody = 
            {
                name: 'Drone',       
            }

        
        test('should status 200 and data object', async () => {
            mockCategoryUC.updateCategory = jest.fn().mockReturnValue(
                {isSuccess: true, reason: null, data: null})
            
                let req = mockRequest(categoryBody,{},{id:1},{},{ categoryUC: mockCategoryUC})
                let res = mockResponse()
    
                await categoryController.putCategory(req, res, next)
                
    
                expect(mockCategoryUC.updateCategory).toHaveBeenCalled()
                expect(res.status).toBeCalledWith(200)
                expect(res.json).toBeCalledWith(resData.success())
            })
    
        test('should status 404 and message is category not found', async () => {
            mockCategoryUC.updateCategory = jest.fn().mockReturnValue(
                {isSuccess: false, reason: 'category not found', data:null})
            
                let req = mockRequest({},{},{id:2},{},{ categoryUC: mockCategoryUC})
                let res = mockResponse()
        
                await categoryController.putCategory(req, res, next)
        
                expect(res.status).toBeCalledWith(404)
                expect(res.json).toBeCalledWith(resData.failed('category not found', null))
        })

        test("should status is 500 and message is 'internal server error'", async () => {
            mockCategoryUC.updateCategory = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({},{},{id:2},{},{ categoryUC: mockCategoryUC})
            let res = mockResponse();
            let serverError = next();

            await categoryController.putCategory(req, res, next)
            
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });
        
    })

    describe('delete category', () => {

        test('should status 200 and data is object', async () => {
            mockCategoryUC.deleteCategory = jest.fn().mockReturnValue(
                {isSuccess: true, reason: null, data: null})
        
            let req = mockRequest({},{},{id:1},{},{ categoryUC: mockCategoryUC })
            let res = mockResponse()

            await categoryController.deleteCategory(req, res, next)
            

            expect(mockCategoryUC.deleteCategory).toHaveBeenCalled()
            expect(res.status).toBeCalledWith(200)
            expect(res.json).toBeCalledWith(resData.success())
        })
    

        test('should status 404 and message is category not found', async () => {
            mockCategoryUC.deleteCategory = jest.fn().mockReturnValue(
                {isSuccess: false, reason: 'category not found', data:null})
        
            let req = mockRequest({},{},{id:2},{},{ categoryUC: mockCategoryUC})
            let res = mockResponse()

            await categoryController.deleteCategory(req, res, next)

            expect(res.status).toBeCalledWith(404)
            expect(res.json).toBeCalledWith(resData.failed('category not found', null))
        })

               test("should status is 500 and message is 'internal server error'", async () => {
            mockCategoryUC.deleteCategory = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({},{},{id:2},{},{ categoryUC: mockCategoryUC})
            let res = mockResponse();
            let serverError = next();

            await categoryController.deleteCategory(req, res, next)

            
            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
        });
    })

})