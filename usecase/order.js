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

  async getPendingOrderByUserId(userId) {
    let orderPending = await this.orderRepository.getPendingOrderByUserId(
      userId,
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

  async createOrder(userId, orderId, products) {
    let orders = {
      id: orderId,
      user_id: userId,
      status: orderConstant.ORDER_PENDING,
    }

    // add each product in order detail
    let orderDetail = await this.addProductInDetailOrder(
      userId,
      orderId,
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

  async addProductInDetailOrder(userId, orderId, products) {
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
        user_id: userId,
        order_id: orderId,
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

  async updateOrderSubmitted(orderPending) {
    let order = {
      status: orderConstant.ORDER_SUBMITTED,
      completed_date: null,
    }

    let reduceStock = await this.updateStockSoldProduct(
      orderPending.id,
      orderConstant.ORDER_SUBMITTED,
    )

    if (reduceStock.length !== orderPending.products.length) {
      return null
    }

    return await this.orderRepository.updateOrder(orderPending.id, order)
  }

  async updateStatusOrder(orderId, statusOrder) {
    let order = {}

    if (statusOrder === 'ORDER_PROCESSED') {
      order.status = orderConstant.ORDER_PROCESSED
      order.completed_date = null
    } else if (statusOrder === 'ORDER_COMPLETED') {
      order.status = orderConstant.ORDER_COMPLETED
      order.completed_date = new Date()
    } else if (statusOrder === 'ORDER_CANCELED') {
      order.status = orderConstant.ORDER_CANCELED
      order.completed_date = null

      await this.updateStockSoldProduct(orderId, order.status)
    } else {
      order.status = null
    }

    if (order.status === null) {
      return null
    }

    return await this.orderRepository.updateOrder(orderId, order)
  }

  // update stock and sold in each product for part process submitted or canceled
  async updateStockSoldProduct(orderId, statusOrder) {
    // array for tag success process stock and sold in product
    let updateProduct = []

    // get order details
    let orderDetail = await this.orderDetailRepository.getOrderDetailById(
      orderId,
    )

    // process each product
    for (let i = 0; i < orderDetail.length; i++) {
      let calProduct = {}

      let getProductById = await this.productRespository.getproductByID(
        orderDetail[i].product_id,
      )

      if (statusOrder === orderConstant.ORDER_CANCELED) {
        /* 
        Returning the stock of the product that was canceled 
        after the stock was reduced because it was submitted 
        */
        calProduct.stock = getProductById.stock + orderDetail[i].qty
        calProduct.sold = getProductById.sold - orderDetail[i].qty

        let updateStockSoldProduct =
          await this.productRespository.updateProduct(
            orderDetail[i].product_id,
            calProduct,
          )

        if (!updateStockSoldProduct) {
          continue
        }
        updateProduct.push(orderDetail[i].product_id)
      } else if (statusOrder === orderConstant.ORDER_SUBMITTED) {
        // check stock
        if (getProductById.stock < orderDetail[i].qty) {
          continue
        }

        // Reduce product stock after submitted
        calProduct.stock = getProductById.stock - orderDetail[i].qty
        calProduct.sold = getProductById.sold + orderDetail[i].qty
        let updateStockSoldProduct =
          await this.productRespository.updateProduct(
            orderDetail[i].product_id,
            calProduct,
          )

        if (!updateStockSoldProduct) {
          continue
        }

        updateProduct.push(orderDetail[i].product_id)
      } else {
        continue
      }
    }

    return updateProduct
  }
}

module.exports = OrderUC
