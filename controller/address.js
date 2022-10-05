const resData = require('../helper/response');

module.exports = {
  getAddressByID: async (req, res, next) => {
    try {
      let { id } = req.params;
      let addressUC = await req.addressUC.getAddressByID(id);
      if (addressUC.isSuccess === false) {
        return res
          .status(400)
          .json(resData.failed(addressUC.reason, addressUC.data));
      };
      res.status(201).json(
        resData.success(
          addressUC.data,
        ),
      );
    } catch (e) {
      next(e);
    }
  },

  getAllAddress: async (req, res, next) => {
    try {
      let addressUC = await req.addressUC.getAllAddress();
      if (addressUC.isSuccess === false) {
        return res
          .status(400)
          .json(resData.failed(addressUC.reason, addressUC.data));
      };
      res.status(201).json(
        resData.success(
          addressUC.data,
        ),
      );
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
      let addressUC = await req.addressUC.addAddress(address);
      if (addressUC.isSuccess === false) {
        return res
          .status(400)
          .json(resData.failed(addressUC.reason, addressUC.data));
      };
      res.status(201).json(
        resData.success(
          addressUC.data,
        ),
      );
    } catch (e) {
      next(e);
    }
  },

  updateAddress: async (req, res, next) => {
    try {
      let { id } = req.params.id;

      let address = {
        province: req.body.province,
        city: req.body.city,
        postal_code: req.body.postal_code,
        detail: req.body.detail,
        user_id: req.user.id,
      };

      let addressUC = await req.addressUC.updateAddress(id, address);
      if (addressUC.isSuccess === false) {
        return res
          .status(400)
          .json(resData.failed(addressUC.reason, addressUC.data));
      };
      res.status(201).json(
        resData.success(
          addressUC.data,
        ),
      );
    } catch (e) {
      next(e);
    }
  },

  deleteAddress: async (req, res, next) => {
    try {
      let { id } = req.params;
      let addressUC = await req.addressUC.deleteAddress(id);
      if (addressUC.isSuccess === false) {
        return res
          .status(400)
          .json(resData.failed(addressUC.reason, addressUC.data));
      };
      res.status(201).json(
        resData.success(
          addressUC.data,
        ),
      );
    } catch (e) {
      next(e);
    }
  },
};
