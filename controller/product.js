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
}
