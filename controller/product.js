const resData = require('../helper/response')

module.exports = {
  getAllProducts: async (req, res) => {
    let product = await req.productUC.getAllProducts()

    if (product == null) {
      return res
      .status(400)
      .json(resData.failed("list is empty", null))
    }
    res
    .status(200)
    .json(
      resData.success(product)
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
    let existCategory = await req.categoryUC.getCategoryByID(product.category_id)
    if (existCategory == null) {
      return res
        .status(400)
        .json(resData.failed('failed to add, category not found', null))
    }

    let createProductRes = await req.productUC.addProduct(product)
    if (createProductRes === null ) {
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
    console.log(product)
    // check product not null
    let existProduct = await req.productUC.getProductByID(id)
    if(existProduct == null){
      return res
      .status(400)
      .json(resData.failed("failed delete, product not found" , null))
    }
    // end
    let updateProduct = await req.productUC.updateProduct(id, product)
    console.log(updateProduct)
    if (updateProduct == null) {
      return res
      .status(400)
      .json(resData.failed("failed to update product", null))
    }
    res.status(200).json(resData.success(product))
    
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

