const {Product} = require('../models')

class ProductRepository {
  constructor() {
    this.ProductModel = Product
  }

  async getAllProducts() {
    let data = null
    try {
      
      data =await this.ProductModel.findAll()
    } catch (e) {
      console.log(e)
      return null
    }
    return data
  }

  async getproductByID(id) {
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

  async addProduct(product) {
    let isSuccess = false
    try {
      product = await this.ProductModel.create(product)
      isSuccess = true
    } catch (err) {
      console.log(err)
      isSuccess = false
    }
    return {
      isSuccess : isSuccess,
      product : product
    }
  }
  async updateProduct(id,product) {
    let data = null
    try {
      data = await this.ProductModel.update(product,{
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
      data = await this.ProductModel.destroy({
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