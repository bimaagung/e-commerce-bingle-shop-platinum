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
        }

        productUC = new ProductUseCase(mockProductRepo(productValues))
    });

    describe('get all products', ()=>{
        test('seharusnya isSuccess  = true dan data dalam array', async () => { 
            let res = await productUC.getAllProducts()

            expect(res.isSuccess).toBeTruthy()
            expect(Array.isArray(res.data)).toBeTruthy();
        })

        test('seharusnya isSuccess = true dan data = []', async () => { 
            productValues.returnGetAllProducts = null
            productUC = new ProductUseCase(
                mockProductRepo(productValues)
            );

            let res = await productUC.getAllProducts()
            
            expect(res.isSuccess).toBeTruthy()
            expect(res.reason).toEqual('list is empty');
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
            
            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual('product not found');
        })
    })
})
