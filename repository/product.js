const { Product, ProductImage } = require("../models");
const { Op } = require("sequelize");

class ProductRepository {
  constructor() {
    this.ProductModel = Product;
  }

  async getAllProducts(params, options) {
    const filters = {};

    if (params) {
      const search = params.q;
      if (search) {
        filters[Op.or] = [
          {
            id: {
              [Op.like]: `%${search}`,
            },
          },
          {
            name: {
              [Op.like]: `%${search}`,
            },
          },
        ];
      }
    }
    const results = await this.ProductModel.findAndCountAll({
      where: filters,
      ...options,
      disticnt: true,
    });
    return results;
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
    let condition = [];
    condition.push({ name: { [Op.like]: "%" + keyword + "%" } });

    return await this.ProductModel.findAll({
      where: condition,
    });
  }
}

module.exports = ProductRepository;
