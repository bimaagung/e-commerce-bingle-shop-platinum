const resData = require('../helper/response');

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      let getAllProduct = await req.productUC.getAllProducts();

      if (getAllProduct.isSuccess === false) {
        return res
          .status(404)
          .json(resData.failed(getAllProduct.reason, getAllProduct.data));
      }

      res.json(
        resData.success(
          getAllProduct.data,
        ),
      );
    } catch (e) {
      next(e);
    }
  },

  getProductById: async (req, res, next) => {
    try {
      let { id } = req.params;

      let product = await req.productUC.getProductByID(id);
      if (product.isSuccess !== true) {
        return res.status(404).json(resData.failed(product.reason, product.data));
      }

      res.json(resData.success(product.data));
    } catch (e) {
      next(e);
    }
  },

  addProduct: async (req, res, next) => {
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

      res.status(201).json(
        resData.success(
          productUC.data,
        ),
      );
    } catch (e) {
      next(e);
    }
  },

  updateProduct: async (req, res, next) => {
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

      let updateProduct = await req.productUC.updateProduct(id, product);

      if (updateProduct.isSuccess === false) {
        return res
          .status(404)
          .json(resData.failed(updateProduct.reason, updateProduct.data));
      }
      res.status(200).json(
        resData.success(),
      );
    } catch (e) {
      next(e);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      let { id } = req.params;

      let deleteProduct = await req.productUC.deleteProduct(id);
      if (deleteProduct.isSuccess === false) {
        return res
          .status(404)
          .json(resData.failed(deleteProduct.reason, deleteProduct.data));
      }

      res.status(200).json(
        resData.success(),
      );
    } catch (e) {
      next(e);
    }
  },
};
