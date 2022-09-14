const {Product} = require('../models')

class productRepository {
  constructor() {
    this.productModel = Product
  }

  async getAllproducts() {
    let data = null
    try {
      
      data =await this.productModel.findAll()
    } catch (e) {
      console.log(e)
      return null
    }
    return data
  }

  async getproductByID(id) {
    let data = null
    try {
      data = await this.productModel.findOne({
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

  async addProduct(product) {
    let data = null
    try {
      data = await this.productModel.create(product)
    } catch (err) {
      console.log(err)
      return null
    }
    return data
  }
  async updateProduct(id,product) {
    let data = null
    try {
      data = await this.productModel.update(product,{
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
  async deleteProduct(id) {
    let data = null
    try {
      data = await this.productModel.destroy({
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

module.exports = productRepository