/* eslint-disable consistent-return */

const orderConstant = require('../internal/constant/order');

class OrderUC {
  constructor(orderRepository, orderDetailRepository, productRespository, categoryRepository) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.productRespository = productRespository;
    this.categoryRepository = categoryRepository;
  }

  async getListOrder(status) {
    let result = {
      isSuccess: true,
      reason: null,
      data: [],
    };

    let filter = {
      where: {
        status: null,
      },
    };

    let listOrder = [];

    // check there is a query
    if (status !== undefined) {
      const statusUpperCase = status.toUpperCase();
      const splitStatus = statusUpperCase.split(',');
      let multipleStatus = [];

      // check single or multiple query status
      if (splitStatus.length < 2) {
        filter.where.status = splitStatus[0].toString();
        listOrder = await this.orderRepository.getListOrder(filter);
      }

      splitStatus.forEach((data) => {
        multipleStatus.push({ status: data.toUpperCase() });
      });

      listOrder = await this.orderRepository.getListOrderMultipleQuery(multipleStatus);
    } else {
      // get all order in db
      listOrder = await this.orderRepository.getListOrder();
    }

    result.data = listOrder;

    return result;
  }

  async getOrderById(orderId) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
    };

    const order = await this.orderRepository.getOrderById(orderId);

    if (order === null) {
      result.reason = 'order not found';
      return result;
    }

    const productInOrderDetail = await this.getProductByOrderDetail(
      order.order_details,
    );

    const orderData = {
      id: order.id,
      status: order.status,
      created_at: order.createdAt,
      updated_at: order.updatedAt,
      qty: productInOrderDetail.totalQty,
      total_price: productInOrderDetail.totalPrice,
      user: order.user,
      products: productInOrderDetail.resultOrderDetail,
    };

    result.isSuccess = true;
    result.data = orderData;

    return result;
  }

  async getPendingOrderById(orderId) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
    };

    const order = await this.orderRepository.getOrderPendingById(orderId);

    if (order === null) {
      result.reason = 'order not found';
      return result;
    }

    if (order.status !== orderConstant.ORDER_PENDING) {
      result.reason = 'order not found';
      return result;
    }

    result.isSuccess = true;
    result.data = order;

    return result;
  }

  async getPendingOrderByUserId(userId) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
    };

    const orderPending = await this.orderRepository.getPendingOrderByUserId(
      userId,
    );

    if (orderPending === null) {
      result.reason = 'order not found';
      return result;
    }

    const productInOrderDetail = await this.getProductByOrderDetail(
      orderPending.order_details,
    );

    const orderData = {
      id: orderPending.id,
      status: orderPending.status,
      created_at: orderPending.createdAt,
      updated_at: orderPending.updatedAt,
      qty: productInOrderDetail.totalQty,
      total_price: productInOrderDetail.totalPrice,
      user: orderPending.user,
      products: productInOrderDetail.resultOrderDetail,
    };

    result.isSuccess = true;
    result.data = orderData;

    return result;
  }

  async createOrder(userId, orderId, products) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
    };

    const orders = {
      id: orderId,
      user_id: userId,
      status: orderConstant.ORDER_PENDING,
    };

    // check user have pending order
    const getPendingOrder = await this.orderRepository.getPendingOrderByUserId(userId);

    if (getPendingOrder !== null) {
      result.reason = 'user already has pending order';
      return result;
    }

    // add each product in order detail
    const orderDetail = await this.addProductInDetailOrder(
      userId,
      orderId,
      products,
    );

    // check stock product
    if (orderDetail.length < products.length) {
      result.reason = 'can\'t process the order, please check each product in order';
      return result;
    }

    // create a new order user
    await this.orderRepository.createOrder(orders);

    result.isSuccess = true;
    result.data = {
      order_id: orderId,
      products: orderDetail,
    };

    return result;
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

      if (getProductById.stock < products[i].qty) {
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
      await this.orderDetailRepository.addOrderDetails(
        orderDetail,
      );

      // if success push to product_id
      OrderDetailByProductId.push(getProductById);
    }

    return OrderDetailByProductId;
  }

  async getProductByOrderDetail(orderDetail) {
    let result = {
      totalPrice: 0,
      totalQty: 0,
      resultOrderDetail: [],
    };

    for (let i = 0; i < orderDetail.length; i += 1) {
      const product = await this.productRespository.getProductByID(
        orderDetail[i].product_id,
      );

      if (product === null) {
        continue;
      }

      const category = await this.categoryRepository.getCategoryByID(product.category_id);

      const resultProduct = {
        id: product.id,
        name: product.name,
        category: category.name,
        price: product.price,
        qty: orderDetail[i].qty,
        total_price: orderDetail[i].total_price,
      };

      result.totalPrice += orderDetail[i].total_price;
      result.totalQty += orderDetail[i].qty;

      result.resultOrderDetail.push(resultProduct);
    }

    return result;
  }

  async updateOrderSubmitted(userId) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
      statusCode: 404,
    };

    const order = {
      status: orderConstant.ORDER_SUBMITTED,
      completed_date: null,
    };

    const orderPending = await this.orderRepository.getPendingOrderByUserId(userId);

    if (orderPending === null) {
      result.reason = 'order not found';
      return result;
    }

    const reduceStock = await this.updateStockSoldProduct(
      orderPending.id,
      orderConstant.ORDER_SUBMITTED,
    );

    if (reduceStock.length !== orderPending.order_details.length) {
      result.reason = 'recheck the product, make sure the product is still in stock';
      result.statusCode = 400;
      return result;
    }

    await this.orderRepository.updateOrder(orderPending.id, order);

    result.isSuccess = true;
    result.statusCode = 200;

    return result;
  }

  async updateStatusOrder(orderId, statusOrder) {
    let result = {
      isSuccess: false,
      reason: null,
      data: null,
      statusCode: 400,
    };

    let order = {};

    if (statusOrder === 'ORDER_PROCESSED') {
      order.status = orderConstant.ORDER_PROCESSED;
      order.completed_date = null;
    } else if (statusOrder === 'ORDER_COMPLETED') {
      order.status = orderConstant.ORDER_COMPLETED;
      // TODO: fungsi kirim email
      order.completed_date = new Date();
    } else if (statusOrder === 'ORDER_CANCELED') {
      order.status = orderConstant.ORDER_CANCELED;
      order.completed_date = null;

      await this.updateStockSoldProduct(orderId, order.status);
    } else {
      order.status = null;
      result.reason = 'request status outside the specified options';

      return result;
    }

    // check order except status order pending is existing
    const getOrderById = await this.orderRepository.verifyOrderWithoutStatusPending(orderId);

    if (getOrderById === null) {
      result.reason = 'order not found';
      result.statusCode = 404;
      return result;
    }

    const updateStatusOrder = await this.orderRepository.updateOrder(orderId, order);

    result.isSuccess = true;
    result.data = updateStatusOrder;
    result.statusCode = 200;

    return result;
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

        await this.productRespository.updateProduct(
          orderDetail[i].product_id,
          calProduct,
        );

        fixUpdateProduct.push(orderDetail[i].product_id);
      } else if (statusOrder === orderConstant.ORDER_SUBMITTED) {
        // check stock
        if (getProductById.stock < orderDetail[i].qty) {
          continue;
        }

        // Reduce product stock after submitted
        calProduct.stock = getProductById.stock - orderDetail[i].qty;
        calProduct.sold = getProductById.sold + orderDetail[i].qty;

        await this.productRespository.updateProduct(
          orderDetail[i].product_id,
          calProduct,
        );

        fixUpdateProduct.push(orderDetail[i].product_id);
      } else {
        return;
      }
    }

    return fixUpdateProduct;
  }

  // TODO: fungsi kirim email
  // TODO:
}

module.exports = OrderUC;
