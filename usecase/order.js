class OrderUC {
  constructor(orderRepository, orderDetailRepository, productRespository) {
    this.orderRepository = orderRepository
    this.orderDetailRepository = orderDetailRepository
    this.productRespository = productRespository
  }

  async getPendingOrderByUserId(user_id) {
    return await this.orderRepository.getPendingOrderByUserId(user_id)
  }

  async createOrder(user_id, order_id, products) {
    let orders = {
      id: order_id,
      user_id: user_id,
      status: 'PENDING',
    }

    // add each product in order detail
    let orderDetail = await this.addProductInDetailOrder(
      user_id,
      order_id,
      products,
    )

    if (orderDetail.length < 1) {
      return null
    }

    // create a new order user
    let createOrder = await this.orderRepository.createOrder(orders)

    if (!createOrder) {
      return null
    }

    return orderDetail
  }

  async addProductInDetailOrder(user_id, order_id, products) {
    // save product id if success process add order detail
    let OrderDetailByProductId = []

    for (let i = 0; i < products.length; i++) {
      // check qty product order customer
      if (products[i].qty < 1) {
        return
      }

      //check stock product if existing
      let getProductById = await this.productRespository.getproductByID(
        products[i].id,
      )

      if (getProductById.stock < 1) {
        return
      }

      // create object detail order per product
      let orderDetail = {
        user_id: user_id,
        order_id: order_id,
        product_id: products[i].id,
        qty: products[i].qty,
        total_price: getProductById.price * products[i].qty,
      }

      // add product in detail order
      let addOrderDetail = await this.orderDetailRepository.addOrderDetails(
        orderDetail,
      )

      if (addOrderDetail === null) {
        return
      }

      // if success push to product_id
      OrderDetailByProductId.push(getProductById)
    }

    return OrderDetailByProductId
  }
}

module.exports = OrderUC
