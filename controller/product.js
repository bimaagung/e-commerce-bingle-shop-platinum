const resData = require("../helper/response");
const url = require("../libs/handle_Upload");



module.exports = {
  getAllProduct: async (req, res) => {

    let product = await req.productUC.getAllProducts();
    if (product == null) {
      return res
        .status(404)
        .json(resData.failed("product not found", null))
    }
    res.status(200).json(resData.success(product))
  },

  getProductById: async (req, res) => {
    let id = req.params.id;
    let product = await req.productUC.getProductByID(id);
    if (product == null) {
      return res.status(400).json(null);
    }
    res.json(product);
  },

  createProudct: async (req, res) => {
    let product = {
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category_id,
      sold: req.body.sold,
      price: req.body.price,
      stock: req.body.stock,
      image: null,
    };
    let image = null
    if (req.file !== undefined) {
      image = await url.uploadCloudinary(req.file.path)
    } else {
      image = process.env.ITEM_URL
    }
    product.image = image

    let existCategory = await req.categoryUC.getCategoryByID(
      product.category_id
    );
    if (existCategory == null) {
      return res
        .status(400)
        .json(resData.failed("failed to add, category not found", null));
    }

    let createProductRes = await req.productUC.addProduct(product);
    if (createProductRes.isSuccess != true) {
      return res.status(400).json(resData.server_error());
    }
    res.json(resData.success(product));
  },

  updateProduct: async (req, res) => {
    let id = req.params.id;
    let product = {
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category_id,
      sold: req.body.sold,
      price: req.body.price,
      stock: req.body.stock,
      image: null,
    };
    let image = null
    if (req.file !== undefined) {
      image = await url.uploadCloudinary(req.file.path)
    } else {
      oldImage =  await req.productUC.getProductByID(id)
      image = oldImage.image
    }
    product.image = image
   

    let existCategory = await req.categoryUC.getCategoryByID(
      product.category_id
    );
    if (existCategory == null) {
      return res
        .status(400)
        .json(resData.failed("failed to add, category not found", null));
    }

    let existProduct = await req.productUC.getProductByID(id);
    if (existProduct == null) {
      return res
        .status(400)
        .json(resData.failed("failed delete, product not found", null));
    }

    let updateProductRes = await req.productUC.updateProduct(product ,id);
    if (updateProductRes == null) {
      return res.status(400).json(resData.server_error());
    }
    res.status(200).json(resData.success(product));
  },

  deleteProduct: async (req, res) => {
    let id = req.params.id;

    let existProduct = await req.productUC.getProductByID(id);
    if (existProduct == null) {
      return res.status(404).json({ message: "product not found" });
    }
    let product = await req.productUC.deleteProduct(id);
    if (product == null) {
      return res.status(404).json(null);
    }
    res.status(200).json(resData.success(product));
  },
};
