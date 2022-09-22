const { Product } = require('../models');

class ProductRepository {
  constructor() {
    this.ProductModel = Product;
  }

  async getAllProducts() {
    return await this.ProductModel.findAll();
  }

  async getProductByID(id) {
    return await this.ProductModel.findOne({
      where: {
        id,
      },
    });
  }

  async addProduct(product) {
    return await this.ProductModel.create(product);
  }

  async updateProduct(id, product) {
    return await this.ProductModel.update(product, {
      where: {
        id,
      },
    });
  }

  async deleteProduct(id) {
    return await this.ProductModel.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = ProductRepository;
