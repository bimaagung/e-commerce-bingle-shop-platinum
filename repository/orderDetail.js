const {OrderDetail} = require('../models')

class OrderDetailRepository {
  constructor() {
    this.OrderDetailModel = OrderDetail
  }

  async addOrderDetails(order_detail) {
    return this.OrderDetailModel.create(order_detail)
  }

  async getOrderDetailById(orderId) {
    return this.OrderDetailModel.findAll({where: {order_id: orderId}})
  }
}

module.exports = OrderDetailRepository
