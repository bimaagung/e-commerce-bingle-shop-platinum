class ProductUC {
  constructor(productRepository) {
    this.productRepository = productRepository
  }
  
  async getAllProducts(filters) {
    return await this.itemRepository.getAllProducts(filters)
}
  async getProductByID(id) {
    return await this.productRepository.getProductByID(id)
  }

   async addProduct(product) {
    return await this.productRepository.addProduct(product)
  } 
   async updateProduct(product, id) {
    return await this.productRepository.addProduct(product, id)
  } 
  async deleteProduct(id) {
    return await this.productRepository.deleteProduct(id)
  }
}

module.exports = ProductUC