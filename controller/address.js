const resData = require('../helper/response');

module.exports = {
  getAddressByID: async (req, res, next) => {
    /*
      #swagger.tags = ['Address']

      #swagger.responses[200] = {
        description: "Berhasil mengambil alamat berdasarkan id alamat",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successAddAddress"
                  }
              }
          }
      }

      #swagger.responses[400] = {
        description: "Alamat tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/addressNotFound"
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
      let address = await req.addressUC.getAddressByID(id);
      if (address.isSuccess === false) {
        return res
          .status(address.status)
          .json(resData.failed(address.reason));
      }
      res.status(address.status).json(resData.success(address.data));
    } catch (e) {
      next(e);
    }
  },

  getAddressByUserID: async (req, res, next) => {
    try {
      let { id } = req.user;
      let address = await req.addressUC.getAddressByUserID(id);
      if (address.isSuccess !== true) {
        return res
          .status(address.status)
          .json(resData.failed(address.reason, address.data));
      }
      res.status(address.status).json(resData.success(address.data));
    } catch (e) {
      next(e);
    }
  },

  addAddress: async (req, res, next) => {
    /*
      #swagger.tags = ['Address']
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/bodyAddAddress" }
      }

      #swagger.responses[201] = {
        description: "Berhasil menambahkan alamat",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successAddAddress"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Pengguna tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/userNotFound"
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
      let address = {
        province: req.body.province,
        city: req.body.city,
        postal_code: req.body.postal_code,
        detail: req.body.detail,
        user_id: req.user.id,
      };
      let resAddress = await req.addressUC.addAddress(address);
      if (resAddress.isSuccess === false) {
        return res
          .status(resAddress.status)
          .json(resData.failed(resAddress.reason, resAddress.data));
      }
      res.status(resAddress.status).json(resData.success(resAddress.data));
    } catch (e) {
      next(e);
    }
  },

  updateAddress: async (req, res, next) => {
    /*
      #swagger.tags = ['Address']
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/bodyUpdateAddress" }
      }

      #swagger.responses[200] = {
        description: "Berhasil mengubah alamat",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/sucessAddress"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Alamat tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/addressNotFound"
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

      let address = {
        province: req.body.province,
        city: req.body.city,
        postal_code: req.body.postal_code,
        detail: req.body.detail,
        user_id: req.user.id,
      };

      let resAddress = await req.addressUC.updateAddress(id, address);
      if (resAddress.isSuccess === false) {
        return res
          .status(resAddress.status)
          .json(resData.failed(resAddress.reason));

      };
      
      res.status(resAddress.status).json(resData.success());
    } catch (e) {
      next(e);
    }
  },

  deleteAddress: async (req, res, next) => {
    /*
      #swagger.tags = ['Address']

      #swagger.responses[200] = {
        description: "Berhasil menghapus alamat berdasarkan id alamat",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/sucessAddress"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Alamat tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/addressNotFound"
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
      let resAddress = await req.addressUC.deleteAddress(id);
      if (resAddress.isSuccess === false) {
        return res
          .status(resAddress.status)
          .json(resData.failed(resAddress.reason));
      }
      res.status(resAddress.status).json(resData.success());
    } catch (e) {
      next(e);
    }
  },
};
