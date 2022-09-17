const orderConstant = require('../internal/constant/order')
class OrderUC {
  constructor(orderRepository, orderDetailRepository, productRespository) {
    this.orderRepository = orderRepository
    this.orderDetailRepository = orderDetailRepository
    this.productRespository = productRespository
  }

  async getOrderById(orderId) {
    return await this.orderRepository.getOrderById(orderId)
  }

  async getPendingOrderById(orderId) {
    let order = await this.orderRepository.getOrderById(orderId)

    if (order.status !== orderConstant.ORDER_PENDING) {
      return null
    }

    return order
  }

  async getPendingOrderByUserId(user_id) {
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

  async updateStatusOrder(orderId, statusOrder) {
    let order = {}

    if (statusOrder === 'ORDER_PROCESSED') {
      order.status = orderConstant.ORDER_PROCESSED
    } else if (statusOrder === 'ORDER_COMPLETED') {
      order.status = orderConstant.ORDER_COMPLETED
      order.completed_date = new Date()
    } else if (statusOrder === 'ORDER_CANCELED') {
      order.status = orderConstant.ORDER_CANCELED
      order.completed_date = null
      await this.updateStockSoldProduct(orderId, order.status)
    } else if (statusOrder === 'ORDER_CANCELED') {
      order.status = orderConstant.ORDER_CANCELED
      order.completed_date = null
      await this.updateStockSoldProduct(orderId, order.status)
    } else {
      order.status = null
    }

    let updateStatusOrder = await this.orderRepository.updateOrder(
      orderId,
      order,
    )

    if (!updateStatusOrder) {
      return null
    }

    return updateStatusOrder
  }

  // update stock and sold in each product for part process submitted or canceled
  async updateStockSoldProduct(orderId, statusOrder) {
    // get order details
    let orderDetail = await this.orderDetailRepository.getOrderDetailById(
      orderId,
    )

    // process each product
    orderDetail.forEach(async (product) => {
      let calProduct = {}

      let getProductById = await this.productRespository.getproductByID(
        product.product_id,
      )

      if (statusOrder === orderConstant.ORDER_CANCELED) {
        /* 
        Returning the stock of the product that was canceled 
        after the stock was reduced because it was submitted 
        */
        calProduct.stock = getProductById.stock + product.qty
        calProduct.sold = getProductById.sold - product.qty

        await this.productRespository.updateProduct(
          product.product_id,
          calProduct,
        )
      } else if (statusOrder === 'ORDER_SUBMITTED') {
        // Reduce product stock after submitted
        calProduct.stock = getProductById.stock - product.qty
        calProduct.sold = getProductById.sold + product.qty

        await this.productRespository.updateProduct(
          product.product_id,
          calProduct,
        )
      } else {
        return
      }
    })
  }
}

module.exports = OrderUC
