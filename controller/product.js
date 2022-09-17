
const resData = require('../helper/response')


module.exports = {
  getAllProduct: async (req, res) => {
    let category_id = req.query.category_id
    let product = await req.productUC.getAllProduct(category_id)
    
    if (product == null) {
      product = []
    }
    res.json(product)
  },

  getProductById: async (req, res) => {
    let id = req.params.id
    let product = await req.productUC.getProductByID(id)
    if (product == null) {
      return res.status(400).json(null)
    }
    res.json(product)
  },
  
  addProduct: async (req, res) => {
    let product = {
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category_id,
      sold: req.body.sold,
      price: req.body.price,
      stock: req.body.stock  
    }
    // TODO Check category not null
    let existCategory = await req.categoryUC.getCategoryByID(id)
    if(existCategory == null){
      return res.status(400).json(resData.failed("failed to add, category not found" , null))
    }


    // 
    let createProductRes = await req.productUC.addProduct(product)
    if (createProductRes == null) {
      return res.status(400).json(null)
    }
    res.status(200).send({
      
        status : "ok",
        message: "success",
          data : product
               
    })
        
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
      stock: req.body.stock  
    }
    // cek produk ada tidak
    let existProduct = await req.productUC.getProductByID(id)
    if(existProduct == null){
      return res.status(400).json(resData.failed("failed delete, product not found" , null))
    }
    // end
    let updateProductRes = await req.productUC.updateProduct(id, product)
    if (updateProductRes == null) {
      return res.status(400).json(resData.server_error())
    }
    return res.status(200).json(resData.success(product))
    },

  deleteProduct: async (req, res) => {
    let id = req.params.id
    
    let existProduct = await req.productUC.getProductByID(id)
    if(existProduct == null){
      return res.status(404).json({message : "product not found"})
    }
    let product = await req.productUC.deleteProduct(id)
    if (product == null) {
      return res.status(404).json(null)
      }
    return res.status(200).json(resData.success(product)); 
  }
}



