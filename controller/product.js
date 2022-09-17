const { success } = require('../helper/response')
const resData = require('../helper/response')

module.exports = {
  getAllProduct: async (req, res) => {
    let category_id = req.query.category_id
    let product = await req.productUC.getAllProduct(category_id)

    if (product == null) {
      return res.status(400).json(resData.failed("list is empty", null))
    }
    res.status(200).json(
      resData.success({
      status: 'ok',
      message: 'success',
      data: product,
    }),
    )

  },

  getProductById: async (req, res) => {
    let id = req.params.id
    let product = await req.productUC.getProductByID(id)
    if (product == null) {
      return res.status(400).json(resData.failed("product not found", null))
    }
    res.status(200).json(
      resData.success({
      status: 'ok',
      message: 'success',
      data: product,
    }),
    )
  },

  addProduct: async (req, res) => {
    let product = {
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category_id,
      sold: req.body.sold,
      price: req.body.price,
      stock: req.body.stock,
    }

    //Check category not null
    let existCategory = await req.productUC.getCategoryById(id)
    if (existCategory == null) {
      return res
        .status(400)
        .json(resData.failed('failed to add, category not found', null))
    }

    let createProduct = await req.productUC.addProduct(product)
    if (createProduct == null) {
      return res
      .status(400)
      .json(resData.failed("failed to add, choose a product to add", null))
    }
    res.status(200).json(
      resData.success({
      status: 'ok',
      message: 'success',
      data: product,
    }),
    )
  },

  updateProduct: async (req, res) => {
    let id = req.params.id
    let product = {
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category_id,
      //image: req.body.image,
      sold: req.body.sold,
      price: req.body.price,
      stock: req.body.stock,
    }
    // check product not null
    let existProduct = await req.productUC.getProductByID(id)
    if(existProduct == null){
      return res
      .status(400)
      .json(resData.failed("failed delete, product not found" , null))
    }
    // end
    let updateProduct = await req.productUC.updateProduct(id, product)
    if (updateProduct == null) {
      return res
      .status(400)
      .json(resData.server_error("internal server error", null))
    }
    res.status(200).json(
      resData.success({
      status: 'ok',
      message: 'success',
      data: product,
    }),
    )
  },

  deleteProduct: async (req, res) => {
    let id = req.params.id

    let existProduct = await req.productUC.getProductByID(id)
    if (existProduct == null) {
      return res.status(400).json({message: 'product not found'})
    }
    let product = await req.productUC.deleteProduct(id)
    if (product == null) {
      return res.status(400).json("add product to delete", null)
    }
    res.status(200).json(
      resData.success({
      status: 'ok',
      message: 'success',
      data: product,
    }),
    )
  },
}
