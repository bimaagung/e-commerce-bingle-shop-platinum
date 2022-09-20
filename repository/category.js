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
  async updateCategory(category, id){
    let is_success = false
    try {
        category = await this.CategoryModel.update(category, {
           where : {id :id}
        })
        is_success =true
    } catch (err) {
        console.log(err)
    }
    return {
        is_success : is_success,
        category : category
    }
}
  async deleteCategory(id) {
    let isSuccess = false
    let category = null
    try {
      category = await this.CategoryModel.destroy({
        where: {id: id}
      })
      isSuccess =true
    } catch (err) {
      console.log(err)
      return null
    }
    return {
      isSuccess : isSuccess,
      category : category
    }
  }
}

module.exports = CategoryRepository
