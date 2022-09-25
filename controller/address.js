const resData = require('../helper/response');

module.exports = {
  getAddressByID: async (req, res, next) => {
    try {
      let { id } = req.params;

      let address = await req.addressUC.getAddressByID(id);

      if (address == null) {
        return res.status(404).json(resData.failed('address not found'));
      }

      res.json(resData.success(address));
    } catch (error) {
      next(error);
    }
  },

  getAllAddress: async (req, res, next) => {
    try {
    

      let address = await req.addressUC.getAllAddress();

      if (address == null) {
        return res.status(200).json(resData.success(address));
      }

      res.json(resData.success(address));
    } catch (error) {
      next(error);
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

      let newAddress = await req.addressUC.addAddress(address);

      if (newAddress === null) {
        return res.status(400).json(resData.failed('failed add address'));
      }

      res.status(201).json(resData.success(newAddress));
    } catch (error) {
      next(error);
    }
  },

  updateAddress: async (req, res, next) => {
    try {
      let { id } = req.params;
      let address = {
        province: req.body.province,
        city: req.body.city,
        postal_code: req.body.postal_code,
        detail: req.body.detail,
        user_id: req.body.user_id,
      };

      // check address not null
      let existAddress = await req.addressUC.getAddressByID(id);
      if (existAddress == null) {
        return res.status(404)
          .json(resData.failed('address not found', null));
      }

      // end
      let updateAddress = await req.addressUC.updateAddress(id, address);
      if (updateAddress == null) {
        return res
          .status(400)
          .json(resData.failed('failed to update address', null));
      }

      res.json(resData.success(address));
    } catch (error) {
      next(error);
    }
  },

  // todo delete address
  deleteAddress: async (req, res, next) => {
    try {
      let { id } = req.params;

      let existAddress = await req.addressUC.getAddressByID(id);

      if (existAddress == null) {
        return res.status(404).json(resData.failed('address not found', null));
      }

      await req.addressUC.deleteAddress(id);

      res.json(resData.success());
    } catch (error) {
      next(error);
    }
  },
};
