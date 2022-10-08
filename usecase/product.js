/* eslint-disable no-return-await */
class ProductUC {
  constructor(productRepository, categoryRepository) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
  }

  async getAllProducts(filters) {
    let result = {
      isSuccess: false,
      reason: '',
      data: [],
    };
    let getAllProducts = await this.productRepository.getAllProducts(filters);
    result.isSuccess = true;
    result.data = getAllProducts;
    return result;
  }

  async getProductByID(id) {
    let result = {
      isSuccess: false,
      reason: '',
      data: null,
    };

    let getProductByID = await this.productRepository.getProductByID(id);
    if (getProductByID == null) {
      result.reason = 'product not found';
      return result;
    }
    result.isSuccess = true;
    result.data = getProductByID;
    return result;
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
      result.reason = 'failed to add, category not found';
      return result;
    }

    // to add product to database
    let addProduct = await this.productRepository.addProduct(product);

    result.isSuccess = true;
    result.data = addProduct;

    return result;
  }

  async updateProduct(id, product) {
    let result = {
      isSuccess: false,
      reason: '',
      data: null,
    };

    // check product not null
    let existProduct = await this.productRepository.getProductByID(id);

    if (existProduct === null) {
      result.reason = 'product not found';
      return result;
    }
    await this.productRepository.updateProduct(id, product);

    result.isSuccess = true;
    return result;
  }

  async deleteProduct(id) {
    let result = {
      isSuccess: false,
      reason: '',
      data: null,
    };
    let existProduct = await this.productRepository.getProductByID(id);

    if (existProduct === null) {
      result.reason = 'product not found';
      return result;
    }

    return await this.productRepository.deleteProduct(id);
  }
}

module.exports = ProductUC;
