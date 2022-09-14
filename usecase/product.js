class ProductUC {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async getProductByID(id) {
    return await this.productRepository.getProductByID(id)
  }

  async getAllProduct(category_id) {
    return await this.productRepository.getAllProduct(category_id)
  }
}

module.exports = ProductUC