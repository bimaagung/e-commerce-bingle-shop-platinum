const orderConstant = require('../internal/constant/order')
const {Order, User, OrderDetail} = require('../models')

class OrderRepository {
  constructor() {
    this.OrderModel = Order
  }

  async createOrder(order) {
    console.log(order)
    return await this.OrderModel.create(order)
  }

  async getPendingOrderByUserId(user_id) {
    return await this.OrderModel.findOne({
      where: {user_id: user_id, status: orderConstant.ORDER_PENDING},
      include: [
        {
          model: OrderDetail,
          as: 'order_details',
          attribute: ['id', 'product_id', 'qty', 'total_price'],
        },
      ],
    })
  }

  async getOrderById(orderId) {
    return await this.OrderModel.findOne({
      where: {id: orderId},
    })
  }

  async updateOrder(order_id, order) {
    return await this.OrderModel.update(order, {where: {id: order_id}})
  }
}

module.exports = OrderRepository