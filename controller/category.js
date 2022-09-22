const resData = require('../helper/response');

module.exports = {
  getAllCategory: async (req, res, next) => {
    try {
      let category = await req.categoryUC.getAllCategory(null);

      if (category == null) {
        return res
          .status(404)
          .json(resData.failed('category not found', null));
      }

      return res.json(resData.success(category));
    } catch (e) {
      next(e);
    }
  },

  getCategoryById: async (req, res, next) => {
    try {
      let { id } = req.params;

      let category = await req.categoryUC.getCategoryByID(id);

      if (category == null) {
        return res
          .status(404)
          .json(resData.failed('category not found', null));
      }

      return res.json(resData.success(category));
    } catch (e) {
      next(e);
    }
  },

  addCategory: async (req, res, next) => {
    try {
      let category = req.body;

      let addCategory = await req.categoryUC.addCategory(category);

      if (addCategory == null) {
        return res
          .status(404)
          .json(resData.failed('category not found', category));
      }
      return res.status(201).json(resData.success(addCategory));
    } catch (e) {
      next(e);
    }
  },

  putCategory: async (req, res, next) => {
    try {
      let { id } = req.params;
      let category = req.body;

      let categoryById = await req.categoryUC.getCategoryByID(id);

      if (categoryById == null) {
        return res
          .status(404)
          .json(resData.failed('category not found', null));
      }

      await req.categoryUC.updateCategory(category, id);

      res.json(resData.success(category));
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
          .json(resData.failed('category not found', null));
      }

      await req.categoryUC.deleteCategory(id);

      res.json(resData.success('success delete category'));
    } catch (e) {
      next(e);
    }
  },
};
