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
