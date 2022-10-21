class CategoryUC {
  constructor(CategoryRepository) {
    this.CategoryRepository = CategoryRepository;
  }

  async getCategoryByID(id) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
    };

    const category = await this.CategoryRepository.getCategoryByID(id);

    if (category === null) {
      result.reason = 'category not found';
      return result;
    }

    result.isSuccess = true;
    result.data = category;

    return result;
  }

  async getAllCategory() {
    let result = {
      isSuccess: false,
      reason: null,
      data: [],
    };

    const category = await this.CategoryRepository.getAllCategory();

    result.isSuccess = true;
    result.data = category;

    return result;
  }

  async addCategory(category) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
    };

    const addCategory = await this.CategoryRepository.addCategory(category);

    if (addCategory === null) {
      result.reason = 'failed add category';
      return result;
    }

    result.isSuccess = true;
    result.data = addCategory;

    return result;
  }

  async putCategory(category, id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: null,
    };

    const cekCategory = await this.CategoryRepository.getCategoryByID(id);
    if (cekCategory === null) {
      result.reason = 'category not found';
      return result;
    }
    const putCategory = await this.CategoryRepository.putCategory(category, id);

    result.isSuccess = true;
    result.status = 200;
    result.data = putCategory;
    return result;
  }

  async deleteCategory(id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: null,
    };

    let availCategory = await this.CategoryRepository.getCategoryByID(id);
    if (availCategory === null) {
      result.reason = 'category not found';
      result.status = 404;
      return result;
    }
    let deleteCategory = await this.CategoryRepository.deleteCategory(id);

    result.isSuccess = true;
    result.status = 200;
    result.data = deleteCategory;
    return result;
    // await this.CategoryRepository.deleteCategory(id);
    // result.isSuccess = true;
    // result.status = 200;
    // return result;
  }
}

module.exports = CategoryUC;
