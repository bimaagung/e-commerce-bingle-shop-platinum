const resData = require('../helper/response');

module.exports = {
  getAllCategory: async (req, res, next) => {
    /*
      #swagger.tags = ['Category']
      #swagger.responses[200] = {
        description: "Berhasil melihat semua kategori",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successGetAllCategory"
                  }
              }
          }
      }

    */
    try {
      let category = await req.categoryUC.getAllCategory();

      return res.json(resData.success(category.data));
    } catch (e) {
      next(e);
    }
  },

  getCategoryByID: async (req, res, next) => {
    /*
      #swagger.tags = ['Category']
      #swagger.responses[200] = {
        description: "Berhasil melihat semua kategori",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successGetAllCategory"
                  }
              }
          }
      }
      #swagger.responses[404] = {
        description: "Kategori tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/categoryNotFound"
                  }
              }
          }
      }

    */
    try {
      let { id } = req.params;

      let category = await req.categoryUC.getCategoryByID(id);

      if (category.isSuccess === false) {
        return res
          .status(404)
          .json(resData.failed(category.reason, category.data));
      }

      return res.json(resData.success(category.data));
    } catch (e) {
      next(e);
    }
  },

  addCategory: async (req, res, next) => {
    /*
      #swagger.tags = ['Category']

      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/bodyAddCategory" }
      }

      #swagger.responses[200] = {
        description: "Berhasil membuat kategori baru",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successGetAllCategory"
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
      let category = req.body;

      let addCategory = await req.categoryUC.addCategory(category);

      if (addCategory.isSuccess === false) {
        return res
          .status(404)
          .json(resData.failed(category.reason, category.data));
      }
      return res.status(201).json(resData.success(addCategory.data));
    } catch (e) {
      next(e);
    }
  },

  putCategory: async (req, res, next) => {
    /*
      #swagger.tags = ['Category']

      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/bodyUpdateCategory" }
      }

      #swagger.responses[200] = {
        description: "Berhasil memperbarui kategori",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successCategory"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Kategori tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/categoryNotFound"
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
      let category = {name: req.body.name};
      let resCategory = await req.categoryUC.putCategory(category, id);
      if (resCategory.isSuccess === false) {
        return res
          .status(resCategory.status)
          .json(resData.failed(resCategory.reason));

      };
      
      res.status(resCategory.status).json(resData.success());
    } catch (e) {
      next(e);
    }

    //   let categoryById = await req.categoryUC.getCategoryByID(id);

    //   if (categoryById.isSuccess !== true) {
    //     return res
    //       .status(404)
    //       .json(resData.failed(categoryById.reason, null));
    //   }

    //   res.json(resData.success());
    // } catch (e) {
    //   next(e);
    // }
  },

  deleteCategory: async (req, res, next) => {
    /*
      #swagger.tags = ['Category']

      #swagger.responses[200] = {
        description: "Berhasil menghapus kategori",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successCategory"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Kategori tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/categoryNotFound"
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
      let resCategory = await req.categoryUC.deleteCategory(id);
      if (resCategory.isSuccess === false) {
        return res
          .status(resCategory.status)
          .json(resData.failed(resCategory.reason));
      }
      res.status(resCategory.status).json(resData.success());
    } catch (e) {
      next(e);
    }
  },
};
