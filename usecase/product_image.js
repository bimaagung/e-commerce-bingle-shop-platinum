

/* eslint-disable no-return-await */
class ProductImageUC {
  constructor(ProductImageRepository,ProductRespository) {
    this.productImageRepository = ProductImageRepository;
    this.productRespository = ProductRespository;
  }
  async createImageProduct(imageData) {
    let is_success = false;
    let image = null;
    let product = await this.productRespository.getProductByID(imageData.product_id);
    if (product == null) {
      return {
        is_success: is_success,
        image: image,
        message: "failed add image, product not found",
      };
    }
    image = await this.productImageRepository.createImage(imageData)
    if(image == null){
        return {
            is_success: is_success,
            user: user,
            message: "internal server error bbbb"
          }
    }
    is_success = true;
    return {
      is_success: is_success,
      image: image,
    };
  }

}

module.exports = ProductImageUC;
