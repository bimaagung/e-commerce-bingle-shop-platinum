const { DATE } = require("sequelize")

module.exports = {
  getAllProduct: async (req, res) => {
    let product = await req.productUC.getAllProduct(null)
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
    
    let createProductRes = await req.productUC.addProduct(product)
    if (createProductRes == null) {
      return res.status(400).json(null)
    }
    res.status(200).send({
      
        status : "ok",
        message: "success",
          data : {
          id 	          : req.params.id, 
          name          : req.body.name,
          price         : req.body.price,
          stock         : req.body.stock,
          sold	        : req.body.sold,
          //image       : "<img>",
          description   : req.body.description,
          //category_id : "3",
          updatedAt     : new Date(),
          createdAt     : new Date()
          }
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
    let updateProductRes = await req.productUC.updateProduct(id, product)
    if (updateProductRes == null) {
      return res.status(400).json(null)
    }
    res.status(200).send({
      
      status : "ok",
      message: "success",
        data : {
        id 	          : req.params.id, 
        name          : req.body.name,
        price         : req.body.price,
        stock         : req.body.stock,
        sold	        : req.body.sold,
        //image       : "<img>",
        description   : req.body.description,
        //category_id : "3",
        updatedAt     : new Date(),
        createdAt     : new Date()
        }
    })
  },

  deleteProduct: async (req, res) => {
    let id = req.params.id
    let product = await req.productUC.deleteProduct(id)
    if (product == null) {
      return res.status(404).json(null)
      }
    res.status(200).send({
   
        status: "ok",
        message: "Berhasil menghapus product",
        data: {
                "is_success": true,
                "product": 1 //not so sure about the formula here
                }
    });
  }
}


