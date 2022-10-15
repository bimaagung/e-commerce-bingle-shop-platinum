/* eslint-disable no-return-await */
class ProductUC {
  constructor(productRepository, categoryRepository) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
  }

  async getAllProducts(filters) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: [],
    };
    let getAllProducts = await this.productRepository.getAllProducts(filters);

    result.isSuccess = true;
    result.status = 200;
    result.data = getAllProducts;
    return result;
  }

  async getProductById(id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: null,
    };

    let getProductById = await this.productRepository.getProductById(id);
    if (getProductById == null) {
      result.reason = 'product not found';
      return result;
    }
    result.isSuccess = true;
    result.status = 200;
    result.data = getProductById;
    return result;
  }

  async addProduct(product) {
    let result = {
      isSuccess: false,
      status: 404,
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
    result.status = 201;
    return result;
  }

  async updateProduct(id, product) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: null,
    };

    // check product not null
    let existProduct = await this.productRepository.getProductById(id);

    if (existProduct === null) {
      result.reason = 'product not found';
      return result;
    }
    let updateProduct = await this.productRepository.updateProduct(id, product);

    result.isSuccess = true;
    result.status = 200;
    result.data = updateProduct;
    return result;
  }

  async deleteProduct(id) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: '',
      data: null,
    };
    let existProduct = await this.productRepository.getProductById(id);
    if (existProduct === null) {
      result.reason = 'product not found';
      return result;
    }
    let deleteProduct = await this.productRepository.deleteProduct(id);
    result.isSuccess = true;
    result.status = 200;
    result.data = deleteProduct;
    return result;
  }
}

module.exports = ProductUC;
