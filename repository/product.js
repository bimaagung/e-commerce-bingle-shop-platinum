const {Product} = require('../models')

class ProductRepository {
  constructor() {
    this.ProductModel = Product
  }

  async getAllProduct(category_id) {
    if (category_id != null) {
      return await this.ProductModel.findAll({
        where: {
          category_id: category_id
        },
      })
    }

    return await this.ProductModel.findAll()
class ProductUC {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async getProductByID(id) {
    return await this.productRepository.getProductByID(id)
  }

  async getAllProduct(filters) {
    return await this.productRepository.getAllProduct(filters)
  }
}

module.exports = ProductUC