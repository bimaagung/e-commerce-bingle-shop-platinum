/* eslint-disable no-return-await */
const cloudinary = require('../libs/handle_upload');
const defaultImage = require('../internal/constant/defaultImage');

class ProductImageUC {
  constructor(ProductImageRepository, ProductRespository) {
    this.productImageRepository = ProductImageRepository;
    this.productRespository = ProductRespository;
  }

  async getImageProductByProductID(productID) {
    let result = {
      isSuccess: false,
      reason: 'success',
      status: 404,
      data: [],
    };
    let image = await this.productImageRepository.getAllImageByProductID(
      productID,
    );
    if (image === null) {
      result.reason = 'image not found';
      return result;
    }
    result.isSuccess = true;
    result.status = 200;
    result.data = image;

    return result;
  }

  async createImageProduct(imageData) {
    let result = {
      isSuccess: true,
      reason: 'success',
      status: 200,
      data: null,
    };

    let product = await this.productRespository.getProductByID(
      imageData.product_id,
    );
    if (product == null) {
      result.isSuccess = false;
      result.reason = 'failed add image, product not found';
      result.status = 404;
      return result;
    }
    let existImage = await this.productImageRepository.getAllImageByProductID(
      imageData.product_id,
    );

    if (existImage.length === 9) {
      result.isSuccess = false;
      result.reason = 'failed add image, maximum limit image';
      result.status = 400;
      return result;
    }
    let image = null;
    if (imageData.url === null) {
      result.isSuccess = false;
      result.reason = 'failed add image, please insert file';
      return result;
    }
    imageData.url = await cloudinary.uploadCloudinaryProduct(imageData.url);
    image = await this.productImageRepository.createImage(imageData);

    result.data = image;
    return result;
  }

  async updateImageProduct(imageData, id) {
    let result = {
      isSuccess: false,
      reason: 'success',
      status: 404,
      data: null,
    };
    let image = await this.productImageRepository.getImageByID(id);
    if (image == null) {
      result.reason = 'image not found';
      return result;
    }
    imageData.url = await cloudinary.uploadCloudinaryProduct(imageData.url);
    image = await this.productImageRepository.updateImage(imageData, id);
    result.isSuccess = true;
    result.status = 200;
    result.data = image;
    return result;
  }

  async deleteImageProduct(id) {
    let result = {
      isSuccess: false,
      reason: 'success',
      status: 404,
      data: null,
    };
    let image = await this.productImageRepository.getImageByID(id);
    if (image == null) {
      result.reason = 'image not found';
      return result;
    }
    image = await this.productImageRepository.deleteImage(id);
    result.isSuccess = true;
    result.status = 200;
    return result;
  }
}

module.exports = ProductImageUC;
