const resData = require('../helper/response')
const {nanoid} = require('nanoid')

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
      const updateStatusOrder = await req.orderUC.updateStatusOrder(
        order_id,
        status_order,
      )

      if (updateStatusOrder === null) {
        return res.status(404).json(resData.failed('order not found'))
      }

      res.json(resData.success())
    } catch (e) {
      next(e)
    }
  },
}
