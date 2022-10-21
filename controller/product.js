const resData = require("../helper/response");

module.exports = {
  getAllProducts: async (req, res, next) => {
    /*
      #swagger.tags = ['Product']
      #swagger.responses[200] = {
        description: "Berhasil melihat semua produk",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successGetAllProduct"
                  }
              }
          }
      }

    */
    try {
      let getAllProduct = await req.productUC.getAllProducts();

      res.status(200).json(resData.success(getAllProduct.data));
    } catch (e) {
      next(e);
    }
  },

  getProductById: async (req, res, next) => {
    /*
      #swagger.tags = ['Product']
      #swagger.responses[200] = {
        description: "Berhasil melihat produk berdasarkan id produk",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successGetProductById"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Produk tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/productNotFound"
                  }
              }
          }
      }

    */
    try {
      let { id } = req.params;

      let product = await req.productUC.getProductById(id);
      if (product.isSuccess === false) {
        return res
          .status(404)
          .json(resData.failed(product.reason, product.data));
      }

      res.status(200).json(resData.success(product.data));
    } catch (e) {
      next(e);
    }
  },

  addProduct: async (req, res, next) => {
    /*
      #swagger.tags = ['Product']
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/bodyAddProduct" }
      }

      #swagger.responses[201] = {
        description: "Berhasil menambahkan produk baru",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successAddProduct"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Kategori untuk produk tersebut tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/categoryProductNotFound"
                  }
              }
          }
      }

      #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }

    */
    try {
      let product = {
        name: req.body.name,
        description: req.body.description,
        category_id: req.body.category_id,
        sold: 0,
        price: req.body.price,
        stock: req.body.stock,
      };

      let productUC = await req.productUC.addProduct(product);

      if (productUC.isSuccess === false) {
        return res
          .status(404)
          .json(resData.failed(productUC.reason, productUC.data));
      }

      res.status(201).json(resData.success(productUC.data));
    } catch (e) {
      next(e);
    }
  },

  updateProduct: async (req, res, next) => {
    /*
      #swagger.tags = ['Product']
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/bodyUpdateProduct" }
      }

      #swagger.responses[200] = {
        description: "Berhasil mengubah produk",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successProduct"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Produk tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/productNotFound"
                  }
              }
          }
      }

      #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }

    */
    try {
      let { id } = req.params;
      let product = {
        name: req.body.name,
        description: req.body.description,
        category_id: req.body.category_id,
        sold: req.body.sold,
        price: req.body.price,
        stock: req.body.stock,
      };

      let updateProduct = await req.productUC.updateProduct(product, id);

      if (updateProduct.isSuccess === false) {
        return res
          .status(404)
          .json(resData.failed(updateProduct.reason, updateProduct.data));
      }
      res.status(200).json(resData.success());
    } catch (e) {
      next(e);
    }
  },

  deleteProduct: async (req, res, next) => {
    /*
      #swagger.tags = ['Product']

      #swagger.responses[200] = {
        description: "Berhasil menghapus produk",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successProduct"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Produk tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/productNotFound"
                  }
              }
          }
      }

      #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }

    */
    try {
      let { id } = req.params;

      let deleteProduct = await req.productUC.deleteProduct(id);
      if (deleteProduct.isSuccess === false) {
        return res
          .status(404)
          .json(resData.failed(deleteProduct.reason, deleteProduct.data));
      }

      res.status(200).json(resData.success());
    } catch (e) {
      next(e);
    }
  },
  getProductByKeyword: async (req, res, next) => {
    try {
      let keyword = req.query.keyword;

      let resProduct = await req.productUC.getProductByKeyword(keyword);
      if (resProduct.isSuccess === false) {
        return res
          .status(404)
          .json(resData.failed(resProduct.reason, resProduct.data));
      }
      res.status(200).json(resData.success(resProduct.data));
    } catch (e) {
      next(e);
    }
  },
};
