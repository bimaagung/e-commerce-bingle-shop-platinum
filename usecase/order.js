/* eslint-disable consistent-return */

const orderConstant = require('../internal/constant/order');

class OrderUC {
  constructor(orderRepository, orderDetailRepository, productRespository) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.productRespository = productRespository;
  }

  async getOrderById(orderId) {
    const order = await this.orderRepository.getOrderById(orderId);
    return order;
  }

  async getPendingOrderById(orderId) {
    const order = await this.orderRepository.getOrderById(orderId);

    if (order.status !== orderConstant.ORDER_PENDING) {
      return null;
    }

    return order;
  }

  async getPendingOrderByUserId(userId) {
    const orderPending = await this.orderRepository.getPendingOrderByUserId(
      userId,
    );

    if (orderPending === null) {
      return null;
    }

    const productInOrderDetail = await this.getProductByOrderDetail(
      orderPending.order_details,
    );

    const resultOrderDetail = {
      id: orderPending.id,
      status: orderPending.status,
      created_at: orderPending.createdAt,
      updated_at: orderPending.updatedAt,
      products: productInOrderDetail,
    };

    return resultOrderDetail;
  }

  async createOrder(userId, orderId, products) {
    const orders = {
      id: orderId,
      user_id: userId,
      status: orderConstant.ORDER_PENDING,
    };

    // add each product in order detail
    const orderDetail = await this.addProductInDetailOrder(
      userId,
      orderId,
      products,
    );

    if (orderDetail.length < 1) {
      return null;
    }

    // create a new order user
    const createOrder = await this.orderRepository.createOrder(orders);

    if (!createOrder) {
      return null;
    }

    return orderDetail;
  }

  async addProductInDetailOrder(userId, orderId, products) {
    // save product id if success process add order detail
    let OrderDetailByProductId = [];

    for (let i = 0; i < products.length; i += 1) {
      // check qty product order customer
      if (products[i].qty < 1) {
        continue;
      }

      // check stock product if existing
      const getProductById = await this.productRespository.getProductByID(
        products[i].id,
      );

      if (getProductById === null) {
        continue;
      }

      if (getProductById.stock < 1) {
        continue;
      }

      // create object detail order per product
      const orderDetail = {
        user_id: userId,
        order_id: orderId,
        product_id: products[i].id,
        qty: products[i].qty,
        total_price: getProductById.price * products[i].qty,
      };

      // add product in detail order
      const addOrderDetail = await this.orderDetailRepository.addOrderDetails(
        orderDetail,
      );

      if (addOrderDetail === null) {
        continue;
      }

      // if success push to product_id
      OrderDetailByProductId.push(getProductById);
    }

    return OrderDetailByProductId;
  }

  async getProductByOrderDetail(orderDetail) {
    let resultOrderDetail = [];

    for (let i = 0; i < orderDetail.length; i += 1) {
      const product = await this.productRespository.getProductByID(
        orderDetail[i].product_id,
      );

      if (product === null) {
        continue;
      }

      const resultProduct = {
        id: product.id,
        name: product.name,
        category: product.category_id,
        price: product.price,
        qty: orderDetail[i].qty,
        total_price: orderDetail[i].total_price,
      };

      resultOrderDetail.push(resultProduct);
    }

    return resultOrderDetail;
  }

  async updateOrderSubmitted(orderPending) {
    const order = {
      status: orderConstant.ORDER_SUBMITTED,
      completed_date: null,
    };

    const reduceStock = await this.updateStockSoldProduct(
      orderPending.id,
      orderConstant.ORDER_SUBMITTED,
    );

    if (reduceStock.length !== orderPending.products.length) {
      return null;
    }

    const updateStatusOrder = await this.orderRepository.updateOrder(orderPending.id, order);
    return updateStatusOrder;
  }

  async updateStatusOrder(orderId, statusOrder) {
    let order = {};

    if (statusOrder === 'ORDER_PROCESSED') {
      order.status = orderConstant.ORDER_PROCESSED;
      order.completed_date = null;
    } else if (statusOrder === 'ORDER_COMPLETED') {
      order.status = orderConstant.ORDER_COMPLETED;
      order.completed_date = new Date();
    } else if (statusOrder === 'ORDER_CANCELED') {
      order.status = orderConstant.ORDER_CANCELED;
      order.completed_date = null;

      await this.updateStockSoldProduct(orderId, order.status);
    } else {
      order.status = null;
    }

    if (order.status === null) {
      return null;
    }

    const updateStatusOrder = await this.orderRepository.updateOrder(orderId, order);

    return updateStatusOrder;
  }

  // update stock and sold in each product for part process submitted or canceled
  async updateStockSoldProduct(orderId, statusOrder) {
    // array for tag success process stock and sold in product
    let fixUpdateProduct = [];

    // get order details
    const orderDetail = await this.orderDetailRepository.getOrderDetailById(
      orderId,
    );

    // process each product
    for (let i = 0; i < orderDetail.length; i += 1) {
      let calProduct = {};

      const getProductById = await this.productRespository.getProductByID(
        orderDetail[i].product_id,
      );

      if (getProductById === null) {
        continue;
      }

      if (statusOrder === orderConstant.ORDER_CANCELED) {
        /*
        Returning the stock of the product that was canceled
        after the stock was reduced because it was submitted
        */
        calProduct.stock = getProductById.stock + orderDetail[i].qty;
        calProduct.sold = getProductById.sold - orderDetail[i].qty;

        const updateStockSoldProduct = await this.productRespository.updateProduct(
          orderDetail[i].product_id,
          calProduct,
        );

        if (updateStockSoldProduct === null) {
          continue;
        }
        fixUpdateProduct.push(orderDetail[i].product_id);
      } else if (statusOrder === orderConstant.ORDER_SUBMITTED) {
        // check stock
        if (getProductById.stock < orderDetail[i].qty) {
          continue;
        }

        // Reduce product stock after submitted
        calProduct.stock = getProductById.stock - orderDetail[i].qty;
        calProduct.sold = getProductById.sold + orderDetail[i].qty;
        const updateStockSoldProduct = await this.productRespository.updateProduct(
          orderDetail[i].product_id,
          calProduct,
        );

        if (!updateStockSoldProduct) {
          continue;
        }

        fixUpdateProduct.push(orderDetail[i].product_id);
      } else {
        return;
      }
    }

    return fixUpdateProduct;
  }
}

module.exports = OrderUC;
