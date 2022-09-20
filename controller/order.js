const resData = require('../helper/response')
const {nanoid} = require('nanoid')
const orderConstant = require('../internal/constant/order')

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      let order_id = nanoid(16)
      let user_id = req.user.id
      let products = req.body.products

      // check user have pending order
      const getPendingOrder = await req.orderUC.getPendingOrderByUserId(user_id)

      if (getPendingOrder !== null) {
        return res
          .status(400)
          .json(resData.failed('user already has pending order'))
      }

      // create a new order
      const createOrder = await req.orderUC.createOrder(
        user_id,
        order_id,
        products,
      )

      if (createOrder === null) {
        return res
          .status(400)
          .json(
            resData.failed(
              `can't process the order, please check each product in order`,
            ),
          )
      }

      res.status(201).json(
        resData.success({
          order_id: order_id,
          products: createOrder,
        }),
      )
    } catch (e) {
      next(e)
    }
  },

  getPendingOrderByUserId: async (req, res, next) => {
    try {
      let user_id = req.user.id

      let order = await req.orderUC.getPendingOrderByUserId(user_id)
      if (order === null) {
        return res.status(404).json(resData.failed('not found pending order'))
      }

      res.json(resData.success(order))
    } catch (e) {
      next(e)
    }
  },

  changeStatusOrder: async (req, res, next) => {
    try {
      const order_id = req.params.id
      const status_order = req.body.status

      //  check order
      let orderById = await req.orderUC.getOrderById(order_id)

      if (orderById === null) {
        return res.status(404).json(resData.failed('order not found'))
      }

      let pendingOrderById = await req.orderUC.getPendingOrderById(order_id)

      // check order pending
      if (pendingOrderById > 0) {
        return res.status(400).json(resData.failed('order still pending'))
      }

      const updateStatusOrder = await req.orderUC.updateStatusOrder(
        order_id,
        status_order,
      )

      if (updateStatusOrder === null) {
        return res
          .status(404)
          .json(resData.failed('failed update status order'))
      }

      res.json(resData.success())
    } catch (e) {
      next(e)
    }
  },

  submitOrder: async (req, res, next) => {
    try {
      const userId = req.user.id

      let orderPending = await req.orderUC.getPendingOrderByUserId(userId)

      if (orderPending === null) {
        return res.status(404).json(resData.failed('order not found'))
      }

      let order = await req.orderUC.updateOrderSubmitted(orderPending)

      if (order === null) {
        return res
          .status(400)
          .json(
            resData.failed(
              'recheck the product. make sure the product is still in stock',
            ),
          )
      }

      res.json(resData.success())
    } catch (e) {
      next(e)
    }
  },
}
