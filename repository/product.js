const { Product, ProductImage } = require('../models');

class ProductRepository {
  constructor() {
    this.ProductModel = Product;
  }

  async getAllProducts() {
    return await this.ProductModel.findAll({
      include: [
        {
          model: ProductImage,
          attributes: ['id', 'url'],
        },
      ],
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  }

  async getProductByID(id) {
    return await this.ProductModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ProductImage,
        },
      ],

    });
  }

  async getProductByCategoryId(id) {
    return await this.ProductModel.findAll({
      where: {
        category_id: id,
      },
    });
  }

  async addProduct(product) {
    return await this.ProductModel.create(product);
  }

  async updateProduct(product, id) {
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

  async getProductByKeyword(keyword) {
    let condition = []
    condition.push({ name: { [Op.like]: "%" + keyword + "%" } })

    return await this.ProductModel.findAll({
      where: condition,

    });
  }
}

module.exports = ProductRepository;
