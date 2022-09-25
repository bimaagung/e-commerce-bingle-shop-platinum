const { Product , ProductImage } = require('../models');

class ProductRepository {
  constructor() {
    this.ProductModel = Product;
  }

  async getAllProducts() {
    return await this.ProductModel.findAll({
      include: [
      {
        model: ProductImage,
        attributes: ['id','url'],
      },
    ]});
  }

  async getProductByID(id) {
    return await this.ProductModel.findOne({
      where: {
        id,
      }, include: [
        {
          model: ProductImage,
          attributes: ['id','url'],
        },
      ],
      
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
