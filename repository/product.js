const {Product} = require('../models')

class ProductRepository {
  constructor() {
    this.ProductModel = Product
  }

  async getAllProduct(filters) {
    if (filters != null) {
      return await this.ProductModel.findAll({
        where: filters,
      })
    }

    return await this.ProductModel.findAll()
  }

  async getProductByID(id) {
    let data = null
    try {
      data = await this.ProductModel.findOne({
        where: {
          id: id,
        },
      })
    } catch (err) {
      console.log(err)
      return null
    }
    return data
  }
}

module.exports = ProductRepository
