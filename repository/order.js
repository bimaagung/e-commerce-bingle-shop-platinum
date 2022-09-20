const orderConstant = require('../internal/constant/order')
const {Order, OrderDetail} = require('../models')

class OrderRepository {
  
  constructor() {
    this.OrderModel = Order
  }

  async createOrder(order) {
    console.log(order)
    return await this.OrderModel.create(order)
  }

  async getPendingOrderByUserId(userId) {
    return await this.OrderModel.findOne({
      where: {user_id: userId, status: orderConstant.ORDER_PENDING},
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

  async updateOrder(orderId, order) {
    return await this.OrderModel.update(order, {where: {id: orderId}})
  }
}

module.exports = OrderRepository
