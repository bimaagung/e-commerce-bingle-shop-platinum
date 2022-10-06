const ProductImageUseCase = require('../../usecase/product_image')
const mockImageProductRepo = require('../mock/repository.imageProduct')
const mockProductRepo = require('../mock/repository.product.mock')

let imageProductValues, productValues = {}

describe('Image Product', () => {
    beforeEach(() => {
        imageProductValues = {
            returnGetImageByID: true,
            returnGetAllImageByProductID: true,
            returnCreateImage: true,
            returnUpdateImage: true,
            returnDeleteImage: true
        }

        productValues = {
            returnGetProductByID: true,
        }
        productImageUC = new ProductImageUseCase(
            mockImageProductRepo(imageProductValues),
            mockProductRepo(productValues)
        )
    })
    describe('get image product by product_id', () => {
        test('isSuccess == true ', async () => {
            let res = await productImageUC.getImageProductByProductID()

            expect(res.isSuccess).toBeTruthy()
            expect(res.data === null).toEqual(false)

        })
        test('isSuccess == false product not found', async () => {
            productValues.returnGetProductByID = null
            productImageUC = new ProductImageUseCase(
                mockImageProductRepo(imageProductValues),
                mockProductRepo(productValues)
            )
            let res = await productImageUC.getImageProductByProductID()

            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual("product not found")
        })
        test('isSuccess = false image not found', async () => {
            imageProductValues.returnGetAllImageByProductID = null
            productImageUC = new ProductImageUseCase(
                mockImageProductRepo(imageProductValues),
                mockProductRepo(productValues)
            )
            let res = await productImageUC.getImageProductByProductID()

            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual("image not found")
        })
    })
    describe('create image product', () => {
        test('isSuccess = true', async () => {
            let res = await productImageUC.createImageProduct({
                id: 1,
                url: "url_image_example",
                product_id: 1
            })
            expect(res.isSuccess).toBeTruthy()
            expect(res.data === null).toEqual(false)
        })
        test('isSucces = false product wrong product id', async () => {
            productValues.returnGetProductByID = null
            productImageUC = new ProductImageUseCase(
                mockImageProductRepo(imageProductValues),
                mockProductRepo(productValues)
            )
            let res = await productImageUC.createImageProduct({
                id: 1,
                url: "url_image_example",
                product_id: 1
            })
            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual("failed add image, product not found")
        })
        test('isSuccess = product error server',async () => {
            imageProductValues.returnCreateImage = null
            productImageUC = new ProductImageUseCase(
                mockImageProductRepo(imageProductValues),
                mockProductRepo(productValues)
            )
            let res = await productImageUC.createImageProduct({
                id: 1,
                url: "url_image_example",
                product_id: 1
            })
            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual("something went error")
        })
    })
    describe('update image product', () => {
        test('isSucces = true', async () => {
            let res = await productImageUC.updateImageProduct({
                id: 1,
                url: "url_image_example",
                product_id: 1
            }, 1)
            expect(res.isSuccess).toBeTruthy()
            expect(res.data === null).toEqual(false)
        })
        test('isSuccess = product wrong product id',async () => {
            imageProductValues.returnGetImageByID = null
            productImageUC = new ProductImageUseCase(
                mockImageProductRepo(imageProductValues),
                mockProductRepo(productValues)
            )
            let res = await productImageUC.updateImageProduct({
                id: 1,
                url: "url_image_example",
                product_id: 1
            }, 1)
            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual("image not found")
        })
       
    })
    describe('delete image product', ()=>{
        test('isSuccess = true', async ()=>{
            let res = await productImageUC.deleteImageProduct()
            
            expect(res.isSuccess).toBeTruthy()
            expect(res.data === null).toEqual(true)
        })
        test('isSuccess = false image not found',async ()=>{
            imageProductValues.returnGetImageByID = null
            productImageUC = new ProductImageUseCase(
                mockImageProductRepo(imageProductValues),
                mockProductRepo(productValues)
            )
            let res = await productImageUC.deleteImageProduct()
            
            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual("image not found")
        })
    })
})
