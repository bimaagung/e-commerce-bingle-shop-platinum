class CategoryUC {
    constructor(categoryRepository) {
      this.categoryRepository = categoryRepository
    }
  
    async getCategoryByID(id) {
      return await this.categoryRepository.getCategoryByID(id)
    }
  
    async getAllCategory() {
      return await this.categoryRepository.getAllCategory()
    }

    async addCategory(){
      return await this.categoryRepository.addCategory()
    }

    async putCategory(id, category){
      return await this.categoryRepository.putCategory(id, category)
    }

    async deleteCategory(id){
      return await this.categoryRepository.deleteCategory(id)
    }


  }
  
  module.exports = CategoryUC
  //blm fix