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
    let category = req.body
    let update_category = await req.categoryUC.addCategory(category)
    if (update_category == null) {
      return res
        .status(400)
        .json(resData.failed('failed, category not found',category))
    }
    return res.status(200).json(resData.success(category))
  },

  putCategory: async (req, res) => {
    let id = req.params.id
    let category = req.body
    let updateRes = await req.categoryUC.updateCategory(category,id)
    if (updateRes.isSuccess == true) {
      console.log(updateRes)
      return res
        .status(500)
        .json(resData.server_error())
    }
    res.status(200).json(resData.success(category))
  },

  deleteCategory: async (req, res) => {
    let id = req.params.id
    let category = await req.categoryUC.getCategoryByID(id)
    if (category == null) {
      return res
        .status(400)
        .json(resData.failed('failed, category not found', null))
    }
    let deleteRes = await req.categoryUC.deleteCategory(id)
    if(deleteRes.isSuccess != true){
      return res 
      .status(500)
      .json(resData.server_error())
    }
    res.status(200).json(resData.success('success delete category'))
  }
}
