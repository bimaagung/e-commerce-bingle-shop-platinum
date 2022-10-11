/* eslint-disable no-return-await */
class ProductImageUC {
  constructor(ProductImageRepository, ProductRespository) {
    this.productImageRepository = ProductImageRepository;
    this.productRespository = ProductRespository;
  }
  async getImageProductByProductID(productID) {
  let result = {
    isSuccess : false,
    reason : "success",
    status : 404,
    data : []
   }
    let product = await this.productRespository.getProductByID(productID)
    if (product == null) {
      result.reason = "product not found" 
      return result
    }
    let image = await this.productImageRepository.getAllImageByProductID(productID)
    if(image === null){
      result.reason = "image not found"
      return result
    }
    result.isSuccess = true
    result.status = 200
    result.data = image

    return result
  }

  async createImageProduct(imageData) {
    let result = {
      isSuccess : false,
      reason : "success",
      status : 404,
      data : null
     }
    let product = await this.productRespository.getProductByID(
      imageData.product_id
    );
    if (product == null) {
     result.reason = "failed add image, product not found"
     return result 
    }
   let image = await this.productImageRepository.createImage(imageData);
    if(image == null){
      result.status = 500 
      result.reason = "something went error" 
      return result
    }
    result.status = 200
    result.isSuccess = true;
    result.data = image
    return result
  }
  async updateImageProduct(imageData, id) {
    let result = {
      isSuccess : false,
      reason : "success",
      status : 404,
      data : null
     }
    let image = await this.productImageRepository.getImageByID(id);
    if (image == null) {
      result.reason = "image not found"
      return result
    }
    image = await this.productImageRepository.updateImage(imageData, id);
    result.isSuccess = true
    result.status = 200
    result.data = image
    return result
  }
  async deleteImageProduct(id) {
    let result = {
      isSuccess : false,
      reason : "success",
      status : 404,
      data : null
     }
   let image = await this.productImageRepository.getImageByID(id);
    if (image == null) {
      result.reason = "image not found"
      return result
    }
    image = await this.productImageRepository.deleteImage(id);
    result.isSuccess = true;
    result.status = 200
    return result

  }
}

module.exports = ProductImageUC;
