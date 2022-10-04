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

      //  check order
      const orderById = await req.orderUC.getOrderById(orderId);

      if (orderById === null) {
        return res.status(404).json(resData.failed('order not found'));
      }

      const pendingOrderById = await req.orderUC.getPendingOrderById(orderId);

      // check order pending
      if (pendingOrderById > 0) {
        return res.status(400).json(resData.failed('order still pending'));
      }

      const updateStatusOrder = await req.orderUC.updateStatusOrder(
        orderId,
        statusOrder,
      );

      if (updateStatusOrder === null) {
        return res
          .status(404)
          .json(resData.failed('failed update status order'));
      }

      res.json(resData.success());
    } catch (e) {
      next(e);
    }
  },

  submitOrder: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const orderPending = await req.orderUC.getPendingOrderByUserId(userId);

      if (orderPending === null) {
        return res.status(404).json(resData.failed('order not found'));
      }

      const order = await req.orderUC.updateOrderSubmitted(orderPending);

      if (order === null) {
        return res
          .status(400)
          .json(
            resData.failed(
              'recheck the product, make sure the product is still in stock',
            ),
          );
      }

      res.json(resData.success());
    } catch (e) {
      next(e);
    }
  },
};
