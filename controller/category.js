const resData = require('../helper/response')
module.exports = {
  getAllCategory: async (req, res) => {
    let category = await req.categoryUC.getAllCategory(null)
    if (category == null) {
      return res
        .status(404)
        .json(resData.failed('failed, category not found', null))
    }
    return res.status(200).json(resData.success(category))
  },

  getCategoryById: async (req, res) => {
    let id = req.params.id
    let category = await req.categoryUC.getCategoryByID(id)
    if (category == null) {
      return res
        .status(400)
        .json(resData.failed('failed, category not found', null))
    }
    return res.status(200).json(resData.success(category))
  },

  addCategory: async (req, res) => {
    let category = req.body.name
    let update_category = await req.categoryUC.addCategory(category)
    if (update_category == null) {
      return res
        .status(400)
        .json(resData.failed('failed, category not found', null))
    }
    return res.status(200).json(resData.success(category))
  },

  putCategory: async (req, res) => {
    let category = req.body.name
    let id = req.params.id
    let update_category = await req.CategoryUC.putCategory(id, category)
    if (update_category == null) {
      return res
        .status(400)
        .json(resData.failed('failed, category not found', null))
    }
    return res.status(200).json(resData.success(category))
  },

  deleteCategory: async (req, res) => {
    let id = req.params.id
    let category = await req.CategoryUC.deleteCategory(id)
    if (category == null) {
      return res
        .status(400)
        .json(resData.failed('failed, category not found', null))
    }
    return res.status(200).json(resData.success(category))
  },
}
