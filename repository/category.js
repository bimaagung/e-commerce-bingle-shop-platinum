const {Category} = require('../models')

class CategoryRepository {
  constructor() {
    this.CategoryModel = Category
  }

  async getAllCategory() {
    
    return await this.CategoryModel.findAll()
  }

  async getCategoryByID(id) {
    let data = null
    try {
      data = await this.CategoryModel.findOne({
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

  async addCategory(category) {
    let data = null
    try {
      data = await this.CategoryModel.create(category)
    } catch (err) {
      console.log(err)
      return null
    }
    return data
  }
  async putCategory(id,category) {
    let data = null
    try {
      data = await this.CategoryModel.update(category,{
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
  async deleteCategory(id) {
    let data = null
    try {
      data = await this.CategoryModel.destroy({
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

module.exports = CategoryRepository
