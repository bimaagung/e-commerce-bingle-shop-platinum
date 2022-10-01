/* eslint-disable no-return-await */
class ProductUC {
  constructor(productRepository, categoryRepository) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
  }

  async getAllProducts(filters) {
    return await this.productRepository.getAllProducts(filters);
  }

  async getProductByID(id) {
    return await this.productRepository.getProductByID(id);
  }

  async addProduct(product) {
    let result = {
      isSuccess: false,
      reason: '',
      data: null,
    };

    // to check whether the category exists
    let existCategory = await this.categoryRepository.getCategoryByID(product.category_id);

    if (existCategory == null) {
      result.reason = 'category not found';
    }

    // to add product to database
    let addProduct = await this.productRepository.addProduct(product);

    result.isSuccess = true;
    result.data = addProduct;

    return result;
  }

  async updateProduct(id, product) {
    return await this.productRepository.updateProduct(id, product);
  }

  async deleteProduct(id) {
    return await this.productRepository.deleteProduct(id);
  }
}

module.exports = ProductUC;
