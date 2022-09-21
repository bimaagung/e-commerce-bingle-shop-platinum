const {ProductImage} = require("../models")

class ProductImageRepository {
    constructor() {
      this.productImageModel = ProductImage;
    }
    async createImage(images){
        return await this.productImageModel.create(images)
        
    }
}

module.exports = ProductImageRepository