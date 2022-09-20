const orderConstant = require('../internal/constant/order');
const { Order, OrderDetail } = require('../models');

class OrderRepository {
  constructor() {
    this.OrderModel = Order;
  }

  async createOrder(orders) {
    const order = await this.OrderModel.create(orders);
    return order;
  }

  async getPendingOrderByUserId(userId) {
    const order = await this.OrderModel.findOne({
      where: { user_id: userId, status: orderConstant.ORDER_PENDING },
      include: [
        {
          model: OrderDetail,
          as: 'order_details',
          attribute: ['id', 'product_id', 'qty', 'total_price'],
        },
      ],
    });

    return order;
  }

  async getOrderById(orderId) {
    const order = await this.OrderModel.findOne({
      where: { id: orderId },
    });

    return order;
  }

  async updateOrder(orderId, orders) {
    const order = await this.OrderModel.update(orders, { where: { id: orderId } });
    return order;
  }
}

module.exports = OrderRepository;
