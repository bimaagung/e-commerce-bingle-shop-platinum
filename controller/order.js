const { nanoid } = require('nanoid');
const resData = require('../helper/response');

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      const orderId = nanoid(16);
      const userId = req.user.id;
      const { products } = req.body;

      // create a new order
      const order = await req.orderUC.createOrder(
        userId,
        orderId,
        products,
      );

      if (!order.isSuccess) {
        return res
          .status(400)
          .json(
            resData.failed(
              order.reason,
            ),
          );
      }

      res.status(201).json(
        resData.success(order.data),
      );
    } catch (e) {
      next(e);
    }
  },

  getListOrder: async (req, res, next) => {
    try {
      const { status } = req.query;

      const order = await req.orderUC.getListOrder(status);

      if (order.data.length < 0) {
        return res.json(order.reason);
      }

      return res.status(200).json(resData.success(order.data));
    } catch (e) {
      next(e);
    }
  },

  getPendingOrderByUserId: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const order = await req.orderUC.getPendingOrderByUserId(userId);

      if (order.isSuccess === false) {
        return res.status(404).json(resData.failed(order.reason));
      }
      res.status(200).json(resData.success(order.data));
    } catch (e) {
      next(e);
    }
  },

  changeStatusOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const statusOrder = req.body.status;

      const order = await req.orderUC.updateStatusOrder(
        orderId,
        statusOrder,
      );

      if (order.isSuccess === false) {
        return res
          .status(order.statusCode)
          .json(resData.failed(order.reason));
      }

      res.status(200).json(resData.success());
    } catch (e) {
      next(e);
    }
  },

  submitOrder: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const order = await req.orderUC.updateOrderSubmitted(userId);

      if (order.isSuccess === false) {
        return res
          .status(order.statusCode)
          .json(
            resData.failed(
              order.reason,
            ),
          );
      }

      res.status(200).json(resData.success());
    } catch (e) {
      next(e);
    }
  },
};
