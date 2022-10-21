const ProductImageUseCase = require('../../usecase/product_image')
const mockImageProductRepo = require('../mock/repository.imageProduct')
const mockProductRepo = require('../mock/repository.product.mock')
const urlImage = require('../../internal/constant/defaultImage')

let imageProductValues, productValues = {}
const cloudinary = {
    uploadCloudinaryProduct: jest
      .fn()
      .mockReturnValue("https://cloudinary.com/product/image.jpg"),
  };
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
            mockProductRepo(productValues),cloudinary
        )
    })
    describe('get image product by product_id', () => {
        test('isSuccess == true ', async () => {
            let res = await productImageUC.getImageProductByProductID()

            expect(res.isSuccess).toBeTruthy()
            expect(res.data === null).toEqual(false)

        })
        test('isSuccess == false product not found', async () => {
            productValues.returnGetProductByID = []
            productImageUC = new ProductImageUseCase(
                mockImageProductRepo(imageProductValues),
                mockProductRepo(productValues)
            )
            let res = await productImageUC.getImageProductByProductID()

            expect(res.isSuccess).toBeTruthy()
            expect(res.reason).toEqual("success")
        })
<<<<<<< HEAD
    })
    describe('get image product by image ID', () => {
        test('isSuccess == true ', async () => {
            let res = await productImageUC.getImageByID()
        })
        test('isSuccess == false product not found', async () => {
            productValues.returnGetImageByID = null
=======
        test('isSuccess = false image not found', async () => {
            imageProductValues.returnGetAllImageByProductID.length = 0
>>>>>>> 76b55f78ae4812ad8d7648036e8991757058b44b
            productImageUC = new ProductImageUseCase(
                mockImageProductRepo(imageProductValues),
                mockProductRepo(productValues)
            )
            let res = await productImageUC.getImageByID()

<<<<<<< HEAD
            expect(res.isSuccess).toBeFalsy()
           
=======
            expect(res.isSuccess).toBeTruthy()
            expect(res.reason).toEqual("success")
>>>>>>> 76b55f78ae4812ad8d7648036e8991757058b44b
        })
    })

    describe('create image product', () => {
        test('isSuccess = true', async () => {
            let res = await productImageUC.createImageProduct({
                id: 1,
                url:urlImage.DEFAULT_PRODUCT_IMAGE,
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
       
    })
    // describe('update image product', () => {
    //     test('isSuccess = true', async () => {
    //         let res = await productImageUC.updateImageProduct(
    //             {image: 'https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg'})
           
        
    //         expect(res.isSuccess).toBeTruthy()
    //         expect(res.data === null).toEqual(false)
    //     })
    //     test('isSuccess = product wrong product id',async () => {
    //         imageProductValues.returnGetImageByID = null
    //         productImageUC = new ProductImageUseCase(
    //             mockImageProductRepo(imageProductValues),
    //             mockProductRepo(productValues)
    //         )
    //         let res = await productImageUC.updateImageProduct({
    //             id: 1,
    //             url: urlImage.DEFAULT_PRODUCT_IMAGE,
    //             product_id: 1
    //         }, 1)
    //         expect(res.isSuccess).toBeFalsy()
    //         expect(res.reason).toEqual("image not found")
    //     })
       
    // })
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
