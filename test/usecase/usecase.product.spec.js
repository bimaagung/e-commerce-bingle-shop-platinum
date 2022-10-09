const ProductUseCase = require('../../usecase/product');
const mockProductRepo = require('../mock/repository.product.mock');

let productValues = {}
let productUC = null;

describe('product', () => {
    beforeEach(() => {
        productValues = {
            returnGetProductByID:true, 
            returnUpdateProduct:true,
            returnGetAllProducts:true,
            returnAddProduct:true,
            returnDeleteProduct:true,
        }

        productUC = new ProductUseCase(mockProductRepo(productValues))
    });

    describe('get all products', () => {
        test('seharusnya isSuccess  = true dan data dalam array', async () => { 
            let res = await productUC.getAllProducts()

            expect(res.isSuccess).toBeTruthy()
            expect(Array.isArray(res.data)).toBeTruthy();
        })

        test('seharusnya isSuccess  = false dan data = []', async () => { 
            productValues.returnGetAllProducts = null
            productUC = new ProductUseCase(
                mockProductRepo(productValues)
            );

            let res = await productUC.getAllProducts()
            
            expect(res.isSuccess).toBeTruthy()
            expect(res.reason).toEqual('list is empty')
            expect(res.data).toEqual([]);
        })
    })

    describe('update products', ()=>{
        test('seharusnya isSuccess  = true', async () => { 
            let res = await productUC.updateProduct(1, {name: 'test'})

            expect(res.isSuccess).toBeTruthy()
        })

        test('seharusnya isSuccess  = false dan reason = product not found', async () => { 
            productValues.returnGetProductByID = null
            productUC = new ProductUseCase(
                mockProductRepo(productValues)
            );
            let res = await productUC.updateProduct(1, {name: 'test'})
            
            expect(res.isSuccess).toBeTruthy()
            expect(res.reason).toEqual('product not found');
        })
    })
    describe('get product by Id', async () => {
        test ('seharusnya isSuccess  = true dan data dalam array', async () => {
            let res = await productUC.getProductByID(1)

            expect(res.isSuccess).toBeTruthy()
            expect(Array.isArray(res.data)).toBeTruthy()
        })

        test('seharusnya isSuccess = false dan data = []', async () => {
            productValues.returnGetProductByID = [null]
            productUC = new ProductUseCase(
                mockProductRepo(productValues)    
            )

            let res = await productUC.getProductByID()

            expect(res.isSuccess).toBeFalsy()
            expect(res.data).toEqual([])
        })
    })

    describe('add product', () => {
        test('should isSuccess  = true and data is object', async () => {
            
            let res = await productUC.addProduct(
                {
                    id: 1,
                    name: 'Asus ROG Zephyrush M16',
                    description: 'Laptop gaming dari asus',
                    category_id: 1,
                    sold: 0,
                    price: 30000000,
                    stock: 20,
                    image: null,
                    createdAt: "12-09-2022 23:30:00",
                    updatedAt: "12-09-2022 23:30:00"
                }
            )
            expect(res.isSuccess).toBeTruthy();
            expect(Array.isArray(res.data)).toBeTruthy();
        });

        test('should isSuccess = false and data = []', async () => {
            productValues.returnAddProduct = null
            productUC = new ProductUseCase(
                mockProductRepo(productValues)
            );

            let res = await productUC.addProduct(1,1,[{ id:1, qty:1}])
            
            expect(res.isSuccess).toBeFalsy();
            expect(res.reason).toEqual('failed to add, category not found')
        })
    })

    describe('deleteProduct', () => {
        test('should isSuccess = true', async () => {
            let res = await productUC.deleteProduct(1[{id:1}])

            expect(res.isSuccess).toBeTruthy();
        })

        test('should isSuccess = false and reason = product not found', async () => {
            productValues.returnDeleteProduct = null
            productUC = new ProductUseCase(mockProductRepo)
        })
            let res = await productUC.deleteProduct()

            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual('Product not found')
    })
})


        







