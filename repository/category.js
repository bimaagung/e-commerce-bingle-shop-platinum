const { Category } = require('../models');

class CategoryRepository {
  constructor() {
    this.CategoryModel = Category;
  }

  async getAllCategory() {
    return await this.CategoryModel.findAll();
  }

  async getCategoryByID(id) {
    return await this.CategoryModel.findOne({
      where: {
        id,
      },
    });
  }

  async addCategory(category) {
    return await this.CategoryModel.create(category);
  }

  async updateCategory(category, id) {
    return await this.CategoryModel.update(category, {
      where: { id },
    });
  }

  async deleteCategory(id) {
    return await this.CategoryModel.destroy({
      where: { id },
    });
  }
}

module.exports = CategoryRepository;
