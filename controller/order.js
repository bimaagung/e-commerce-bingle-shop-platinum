const { nanoid } = require('nanoid');
const resData = require('../helper/response');

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      const orderId = nanoid(16);
      const userId = req.user.id;
      const { products } = req.body;

      // check user have pending order
      const getPendingOrder = await req.orderUC.getPendingOrderByUserId(userId);

      if (getPendingOrder !== null) {
        return res
          .status(400)
          .json(resData.failed('user already has pending order'));
      }

      // create a new order
      const createOrder = await req.orderUC.createOrder(
        userId,
        orderId,
        products,
      );

      if (createOrder === null) {
        return res
          .status(400)
          .json(
            resData.failed(
              'can\'t process the order, please check each product in order',
            ),
          );
      }

      res.status(201).json(
        resData.success({
          order_id: orderId,
          products: createOrder,
        }),
      );
    } catch (e) {
      next(e);
    }
  },

  getPendingOrderByUserId: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const order = await req.orderUC.getPendingOrderByUserId(userId);

      if (order === null) {
        return res.status(404).json(resData.failed('not found pending order'));
      }

      res.json(resData.success(order));
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
              'recheck the product. make sure the product is still in stock',
            ),
          );
      }

      res.json(resData.success());
    } catch (e) {
      next(e);
    }
  },
};
