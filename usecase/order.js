const orderConstant = require('../internal/constant/order')
class OrderUC {
  constructor(orderRepository, orderDetailRepository, productRespository) {
    this.orderRepository = orderRepository
    this.orderDetailRepository = orderDetailRepository
    this.productRespository = productRespository
  }

  async getPendingOrderByUserId(user_id) {
    // TODO : mixing order detail and product in result object
    let orderPending = await this.orderRepository.getPendingOrderByUserId(
      user_id,
    )

    if (orderPending === null) {
      return null
    }

    let productInOrderDetail = await this.getProductByOrderDetail(
      orderPending.order_details,
    )

    let resultOrderDetail = {
      id: orderPending.id,
      status: orderPending.status,
      created_at: orderPending.createdAt,
      updated_at: orderPending.updatedAt,
      products: productInOrderDetail,
    }

    return resultOrderDetail
  }

  async createOrder(user_id, order_id, products) {
    let orders = {
      id: order_id,
      user_id: user_id,
      status: orderConstant.ORDER_PENDING,
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
        continue
      }

      //check stock product if existing
      let getProductById = await this.productRespository.getproductByID(
        products[i].id,
      )

      if (getProductById.stock < 1) {
        continue
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
        continue
      }

      // if success push to product_id
      OrderDetailByProductId.push(getProductById)
    }

    return OrderDetailByProductId
  }

  async getProductByOrderDetail(order_detail) {
    let resultOrderDetail = []

    for (let i = 0; i < order_detail.length; i++) {
      let product = await this.productRespository.getproductByID(
        order_detail[i].product_id,
      )

      if (product === null) {
        continue
      }

      let resultProduct = {
        id: product.id,
        name: product.name,
        category: product.category_id,
        price: product.price,
        qty: order_detail[i].qty,
        total_price: order_detail[i].total_price,
      }

      resultOrderDetail.push(resultProduct)
    }

    return resultOrderDetail
  }
}

module.exports = OrderUC
