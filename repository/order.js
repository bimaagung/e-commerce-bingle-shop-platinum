const {Order} = require('../models')

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
      where: {user_id: user_id, status: 'PENDING'},
    })
  }
}

module.exports = OrderRepository
