const resData = require('../helper/response');

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      let product = await req.productUC.getAllProducts();

      if (product == null) {
        return res
          .status(200)
          .json(resData.failed('list is empty', null));
      }

      res.json(resData.success(product));
    } catch (e) {
      next(e);
    }
  },

  getProductById: async (req, res, next) => {
    try {
      let { id } = req.params;

      let product = await req.productUC.getProductByID(id);
      if (product == null) {
        return res.status(200).json(resData.failed('product not found', null));
      }

      res.status(200).json(
        resData.success(
          product,
        ),
      );
    } catch (e) {
      next(e);
    }
  },

  createProudct: async (req, res, next) => {
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
          .status(400)
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
      let existCategory = await req.categoryUC.getCategoryByID(
        product.category_id,
      );

      if (existCategory == null) {
        return res
          .status(400)
          .json(resData.failed('failed to add, category not found', null));
      }

      // check product not null
      let existProduct = await req.productUC.getProductByID(id);

      if (existProduct == null) {
        return res
          .status(404)
          .json(resData.failed('product not found', null));
      }
      // end

      let updateProduct = await req.productUC.updateProduct(id, product);

      if (updateProduct == null) {
        return res
          .status(400)
          .json(resData.failed('failed to update product', null));
      }

      res.json(resData.success(product));
    } catch (e) {
      next(e);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      let { id } = req.params;
      let existProduct = await req.productUC.getProductByID(id);

      if (existProduct == null) {
        return res.status(404).json(resData.failed('product not found'));
      }

      let product = await req.productUC.deleteProduct(id);
      if (product == null) {
        return res.status(400).json('add product to delete', null);
      }

      res.json(
        resData.success({
          status: 'ok',
          message: 'success',
          data: product,
        }),
      );
    } catch (e) {
      next(e);
    }
  },
};
