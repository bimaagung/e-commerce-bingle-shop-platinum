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
          .json(
            resData.failed('user already has pending order', getPendingOrder),
          )
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

      return res.status(201).json(
        resData.success({
          order_id: order_id,
          products: createOrder,
        }),
      )
    } catch (e) {
      next(e)
    }
  },
}
