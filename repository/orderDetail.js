const { OrderDetail } = require('../models');

class OrderDetailRepository {
  constructor() {
    this.OrderDetailModel = OrderDetail;
  }

  async addOrderDetails(orderDetail) {
    return this.OrderDetailModel.create(orderDetail);
  }

  async getOrderDetailById(orderId) {
    return this.OrderDetailModel.findAll({ where: { order_id: orderId } });
  }
}

module.exports = OrderDetailRepository;
