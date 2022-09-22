const { ProductImage } = require("../models")

class ProductImageRepository {
  constructor() {
    this.productImageModel = ProductImage;
  }
  async createImage(images) {
    return await this.productImageModel.create(images)

  }
  async updateImage(images, id) {
    return await this.productImageModel.update(images, {
      where: {id},
    })
}
  async getImageByID(id){
    return await this.productImageModel.findOne({
      where : {id},
    })
  }
}

module.exports = ProductImageRepository