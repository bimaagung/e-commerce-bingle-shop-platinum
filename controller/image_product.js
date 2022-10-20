const resData = require("../helper/response");
const defaultImage = require("../internal/constant/defaultImage");

module.exports = {
  getImageProductByProductID: async (req, res, next) => {
    /*
      #swagger.tags = ['Product']
      #swagger.responses[200] = {
        description: "Berhasil melihat semua gambar produk berdasarkan id produk",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/imageProduct"
                  }
              }
          }
      }

    */

    let { product_id } = req.params;
    try {
      let resImage = await req.productImageUC.getImageProductByProductID(
        product_id
      );
      if (resImage.isSuccess !== true) {
        return res
          .status(resImage.status)
          .json(resData.failed(resImage.reason));
      }
      res.status(resImage.status).json(resData.success(resImage.data));
    } catch (e) {
      next(e);
    }
  },

  getImageProductByID: async (req, res, next) => {
    let { id } = req.params;
    try {
      let resImage = await req.productImageUC.getImageProductByID(id);
      if (resImage.isSuccess !== true) {
        return res
          .status(resImage.status)
          .json(resData.failed(resImage.reason));
      }
      res.status(resImage.status).json(resData.success(resImage.data));
    } catch (e) {
      next(e);
    }
  },

  addProductImage: async (req, res, next) => {
    /*
    #swagger.tags = ['Product']
    #swagger.consumes = ['multipart/form-data']
    #swagger.requestBody = {
            required: true,
            "@content": {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            product_id: {
                                type: "string"
                            },
                            url: {
                                type: "string",
                                format: "binary"
                            }
                        },
                        required: ["product_id", "url"]
                    }
                }
            }
        }

    #swagger.responses[200] = {
        description: "Berhasil menambahkan gambar di produk",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/addImageProduct"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Produk tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/addImageNotFound"
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
      let dataImage = {
        url: null,
        product_id: req.body.product_id,
        cover_image: false,
      };
      if (req.file !== undefined) {
        dataImage.url = req.file.path;
      }
      let resImage = await req.productImageUC.createImageProduct(dataImage);
      if (resImage.isSuccess !== true) {
        return res
          .status(resImage.status)
          .json(resData.failed(resImage.reason));
      }
      res.status(resImage.status).json(resData.success(resImage.data));
    } catch (e) {
      next(e);
    }
  },
  updateImageProduct: async (req, res, next) => {
    /*
    #swagger.tags = ['Product']
    #swagger.consumes = ['multipart/form-data']
    #swagger.requestBody = {
            required: true,
            "@content": {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            product_id: {
                                type: "string"
                            },
                            url: {
                                type: "string",
                                format: "binary"
                            }
                        },
                        required: ["product_id", "url"]
                    }
                }
            }
        }

    */
    try {
      let { id } = req.params;
      let dataImage = {
        url: req.file.path,
        product_id: req.body.product_id,
      };
      let resImage = await req.productImageUC.updateImageProduct(dataImage, id);
      if (resImage.isSuccess !== true) {
        return res
          .status(resImage.status)
          .json(resData.failed(resImage.reason));
      }
      res.status(200).json(resData.success());
    } catch (e) {
      next(e);
    }
  },
  changeCoverImage: async (req, res, next) => {
    let image_id = req.query.image_id;
    let product_id = req.query.product_id;
    try {
      let resUpdate = await req.productImageUC.changeCoverImage(
        image_id,
        product_id
      );
      if (resUpdate.isSuccess !== true) {
        return res
          .status(resUpdate.status)
          .json(resData.failed(resUpdate.reason));
      }
      res.status(resUpdate.status).json(resData.success());
    } catch (e) {
      next(e);
    }
  },
  deleteImageProduct: async (req, res, next) => {
    /*
      #swagger.tags = ['Product']

      #swagger.responses[200] = {
        description: "Berhasil menghapus gambar produk",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successProduct"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Gambar produk tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/imageProductNotFound"
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

      let resImage = await req.productImageUC.deleteImageProduct(id);
      if (resImage.isSuccess !== true) {
        return res
          .status(resImage.status)
          .json(resData.failed(resImage.reason));
      }
      res.status(resImage.status).json(resData.success());
    } catch (e) {
      next(e);
    }
  },
};
