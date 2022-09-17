const {OrderDetail} = require('../models')

class OrderDetailRepository {
  constructor() {
    this.OrderDetailModel = OrderDetail
  }

  async addOrderDetails(order_detail) {
    return this.OrderDetailModel.create(order_detail)
  }
}

module.exports = OrderDetailRepository
