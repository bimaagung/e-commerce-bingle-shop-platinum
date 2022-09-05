module.exports = {
  getAllProduct: async (req, res) => {
    /*
        #swagger.summary = "Get List Product"
        #swagger.description = 'Get list product'
        #swagger.tags = ['Item']
        #swagger.responses[200] = {
            description: "Item found.",
            schema: [{$ref: '#definitions/Item'}]
        }
        #swagger.responses[400] = {
            description: "Item not found.",
            schema: null
        }
     */
    let product = await req.productUC.getAllProduct(null)
    if (product == null) {
      product = []
    }
    res.json(product)
  },

  getProductById: async (req, res) => {
    /*
        #swagger.summary = "Get Product"
        #swagger.description = 'Get Product By ID'
        #swagger.tags = ['Item']
        #swagger.responses[200] = {
            description: "Item found.",
            schema: {$ref: '#definitions/Item'}
        }
        #swagger.responses[400] = {
            description: "Item not found.",
            schema: null
        }
     */
    let id = req.params.id
    let product = await req.productUC.getProductByID(id)
    if (product == null) {
      return res.status(400).json(null)
    }
    res.json(product)
  },
}
