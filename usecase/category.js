class CategoryUC {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getCategoryByID(id) {
    return await this.categoryRepository.getCategoryByID(id);
  }

  async getAllCategory() {
    return await this.categoryRepository.getAllCategory();
  }

  async addCategory(category) {
    return await this.categoryRepository.addCategory(category);
  }

  async updateCategory(category, id) {
    return await this.categoryRepository.updateCategory(category, id);
  }

  async deleteCategory(id) {
    return await this.categoryRepository.deleteCategory(id);
  }
}

module.exports = CategoryUC;
// blm fix
