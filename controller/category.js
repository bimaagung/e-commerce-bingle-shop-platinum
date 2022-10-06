const resData = require('../helper/response');

module.exports = {
  getAllCategory: async (req, res, next) => {
    try {
      let category = await req.categoryUC.getAllCategory();

      return res.json(resData.success(category.data));
    } catch (e) {
      next(e);
    }
  },

  getCategoryById: async (req, res, next) => {
    try {
      let id = req.params.id;

      let category = await req.categoryUC.getCategoryByID(id);

      if (category.isSuccess === false) {
        return res
          .status(404)
          .json(resData.failed( category.reason, category.data));
      }

      return res.json(resData.success(category.data));

    } catch (e) {
      next(e);
    }
  },

  addCategory: async (req, res, next) => {
    try {
      let category = req.body;

      let addCategory = await req.categoryUC.addCategory(category);

      if (addCategory.isSuccess === false) {
        return res
          .status(404)
          .json(resData.failed(category.reason, category.data));
      }
      return res.status(201).json(resData.success(addCategory.data));
    } catch (e) {
      next(e);
    }
  },

  putCategory: async (req, res, next) => {
    try {
      let { id } = req.params;
      let category = req.body;

      let categoryById = await req.categoryUC.getCategoryByID(id);

      if (categoryById.isSuccess === false) {
        return res
          .status(404)
          .json(resData.failed(category.reason, category.data));
      }

      return res.json(resData.success(category.data));
    } catch (e) {
      next(e);
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      let { id } = req.params;

      let category = await req.categoryUC.getCategoryByID(id);

      if (category === null) {
        return res
          .status(404)
          .json(resData.failed( category.reason, category.data));
      }

      return res.json(resData.success(category.data));
    } catch (e) {
      next(e);
    }
  },
};
