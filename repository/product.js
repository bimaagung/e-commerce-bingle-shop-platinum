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

  async addProduct(product) {
    let data = null
    try {
      data = await this.ProductModel.create(product)
    } catch (err) {
      console.log(err)
      return null
    }
    return data
  }
  async updateProduct(id,product) {
    console.log(Product)
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