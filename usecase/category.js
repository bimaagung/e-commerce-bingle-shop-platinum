class CategoryUC {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getCategoryByID(id) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
    };

    const category = await this.categoryRepository.getCategoryByID(id);

    if (category === null) {
      result.reason = 'category not found';
      return result;
    }

    result.isSuccess = true
    result.data = category

    return result
   
  }

  async getAllCategory() {
    let result = {
      isSuccess: false,
      reason: null,
      data: [],
    };

    const category = await this.categoryRepository.getCategoryByID(id);

    result.isSuccess = true
    result.data = category

    return result
  }

  async addCategory(category) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
    };

    const category = await this.categoryRepository.getCategoryByID(id);

    result.isSuccess = true
    result.data = category

    return result
  }

  async updateCategory(category, id) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
    };

    const cekCategory = await this.categoryRepository.getCategoryByID(id)
    if ( cekCategory === null) {
      result.reason = 'category not found'
      return result
    }
    const updateCategory = await this.categoryRepository.updateCategory(category,id);

    result.isSuccess = true
    result.data = updateCategory

    return result
  }

  async deleteCategory(id) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
    };

    const category = await this.categoryRepository.getCategoryByID(id);
    if ( category === null) {
      result.reason = 'category not found'
      return result
    }
    const deleteCategory = await this.categoryRepository.deleteCategory(id);

    result.isSuccess = true
    return result 
  }
}

module.exports = CategoryUC;
// blm fix
