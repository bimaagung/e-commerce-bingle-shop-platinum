class CategoryUC {
  constructor(categoryRepository, productRepository) {
    this.categoryRepository = categoryRepository;
    this.productRepository = productRepository;
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

    const products = await this.productRepository.getProductByCategoryId(category.id);

    let categories = {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      products,
    };

    result.isSuccess = true;
    result.data = categories;

    return result;
  }

  async getAllCategory() {
    let result = {
      isSuccess: false,
      reason: null,
      data: [],
    };

    const category = await this.categoryRepository.getAllCategory();

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

    const addCategory = await this.categoryRepository.addCategory(category);

    if (addCategory === null) {
      result.reason = 'failed add category';
      return result;
    }

    result.isSuccess = true;
    result.data = addCategory;

    return result;
  }

  async updateCategory(category, id) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
    };

    const cekCategory = await this.categoryRepository.getCategoryByID(id);
    if (cekCategory === null) {
      result.reason = 'category not found';
      return result;
    }
    const updateCategory = await this.categoryRepository.updateCategory(category, id);

    result.isSuccess = true;
    result.data = updateCategory;
    return result;
  }

  async deleteCategory(id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: null,
    };

    let category = await this.categoryRepository.getCategoryByID(id);
    if (category === null) {
      result.reason = 'category not found';
      result.status = 404;
      return result;
    }
    if (category.name === "other") {
      result.reason = 'cant not delet default category'
      result.status = 400
      return result
    }
    let product = await this.productRepository.getProductByCategoryId(id)
    await this.setDefaultCategory(product)
    await this.categoryRepository.deleteCategory(id);
    result.isSuccess = true;
    result.status = 200;
    return result;
  }

  async setDefaultCategory(products) {
    for (let i = 0; i < products.length; i++) {

      let defaultCategory = await this.categoryRepository.getDefaultCategory("other")
      if (defaultCategory === null) {
        let dataCreate = {
          name: "other"
        }
        let newCategory = await this.categoryRepository.addCategory(dataCreate)
        let newProduct = {
          category_id: newCategory.id
        }
        await this.productRepository.updateProduct(newProduct, products[i].id)
      } else {
        let updateData = {
          category_id: defaultCategory.id
        }
        await this.productRepository.updateProduct(updateData, products[i].id)
      }

    }
  }
}

module.exports = CategoryUC;
