const resData = require('../helper/response');

module.exports = {
  getAddressByID: async (req, res, next) => {
    try {
      let  {id} = req.params;
      let address = await req.addressUC.getAddressByID(id);
      if (address.isSuccess === false) {
        return res
          .status(address.status)
          .json(resData.failed(address.reason));
      };
      res.status(address.status).json(resData.success(address.data));
    } catch (e) {
      next(e);
    }
  },

  getAddressByUserID: async (req, res, next) => {
    try {
      let id = req.user.id
      let address = await req.addressUC.getAddressByUserID(id);
      if (address.isSuccess !== true) {
        return res
          .status(address.status)
          .json(resData.failed(address.reason, address.data));
      };
      res.status(address.status).json(resData.success(address.data));
    } catch (e) {
      next(e);
    }
  },

  addAddress: async (req, res, next) => {
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
      };
      res.status(resAddress.status).json(resData.success(resAddress.data));
    } catch (e) {
      next(e);
    }
  },

  updateAddress: async (req, res, next) => {
    try {
      let id  = req.params.id;

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
      res.status(resAddress.status).json(resData.success(resAddress));
    } catch (e) {
      next(e);
    }
  },

  deleteAddress: async (req, res, next) => {
    try {
      let {id} = req.params;
      let resAddress = await req.addressUC.deleteAddress(id);
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
};
