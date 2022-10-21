const { nanoid } = require('nanoid');
const resData = require('../helper/response');

module.exports = {
  createOrder: async (req, res, next) => {
    /*
      #swagger.tags = ['Order']
      #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/definitions/bodyCreateOrder" }
      }

      #swagger.responses[201] = {
        description: "Berhasil membuat pesanan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successCreateOrder"
                  }
              }
          }
      }

       #swagger.responses[400] = {
          content: {
              "application/json": {
                examples: {
                  have_order_pending: {
                    value:{
                      "status": "failed",
                      "message": "user already has pending order"
                    },
                    summary: "Pelanggan masih mempunyai pesanan yang belum di submit"
                  },
                  product_order_empty: {
                    value:{
                      "status": "failed",
                      "message": "can't process the order, please check each product in order"
                    },
                    summary: "Salah satu produk yang dipesan kosong atau tidak ada"
                  }
                },
                schema:{
                  oneOf: [
                    {
                        $ref: "#/definitions/failHaveOrderPending"
                    },
                    {
                        $ref: "#/definitions/failCreateProductOrder"
                    }
                  ]
                },
              }
          }
      }

      #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }
    */
    try {
      const orderId = nanoid(16);
      const userId = req.user.id;
      const { products } = req.body;

      // create a new order
      const order = await req.orderUC.createOrder(
        userId,
        orderId,
        products,
      );

      if (!order.isSuccess) {
        return res
          .status(400)
          .json(
            resData.failed(
              order.reason,
            ),
          );
      }

      res.status(201).json(
        resData.success(order.data),
      );
    } catch (e) {
      next(e);
    }
  },

  getListOrder: async (req, res, next) => {
    /*
      #swagger.tags = ['Order']
      #swagger.autoQuery = false
      #swagger.parameters['status'] = {
          'in': 'query',
          'description': 'Ada dapat memilih semua pesanan dengan mengkosongkan query atau mengisi query untuk filter status dengan satu dan mix parameter [SUBMITTED, PROCESSED, COMPLETED, CANCELED]',
          'schema': {
              '$ref': '#/definitions/queryStatus'
          }
      }

      #swagger.responses[200] = {
        description: "Berhasil melihat semua pesanan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successGetListOrder"
                  }
              }
          }
      }
      #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }
    */
    try {
      const { status } = req.query;

      const order = await req.orderUC.getListOrder(status);

      return res.status(200).json(resData.success(order.data));
    } catch (e) {
      next(e);
    }
  },

  getPendingOrderByUserId: async (req, res, next) => {
    /*
      #swagger.tags = ['Order']
      #swagger.responses[200] = {
        description: "Berhasil melihat pesanan yang belum di submit",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successGetOrderPending"
                  }
              }
          }
      }
      #swagger.responses[404] = {
        description: "Belum membuat pesanan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/orderNotFound"
                  }
              }
          }
      }

      #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }
    */
    try {
      const userId = req.user.id;

      const order = await req.orderUC.getPendingOrderByUserId(userId);

      if (order.isSuccess === false) {
        return res.status(404).json(resData.failed(order.reason));
      }
      res.status(200).json(resData.success(order.data));
    } catch (e) {
      next(e);
    }
  },

  changeStatusOrder: async (req, res, next) => {
    /*
      #swagger.tags = ['Order']
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/bodyUpdateStatusOrder" }
      }
      #swagger.responses[200] = {
        description: "Berhasil memperbaharui status pesanan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successOrder"
                  }
              }
          }
      }

       #swagger.responses[400] = {
        description: "Pesanan tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/outsideOptionStatus"
                  }
              }
          }
      }

       #swagger.responses[404] = {
        description: "Pesanan tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/orderNotFound"
                  }
              }
          }
      }

      #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }
    */
    try {
      const orderId = req.params.id;
      const statusOrder = req.body.status;

      const order = await req.orderUC.updateStatusOrder(
        orderId,
        statusOrder,
      );

      if (order.isSuccess === false) {
        return res
          .status(order.statusCode)
          .json(resData.failed(order.reason));
      }

      res.status(200).json(resData.success());
    } catch (e) {
      next(e);
    }
  },

  submitOrder: async (req, res, next) => {
    /*
      #swagger.tags = ['Order']
      #swagger.responses[200] = {
        description: "Berhasil submit pesanan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successOrder"
                  }
              }
          }
      }

       #swagger.responses[400] = {
        description: "Produk yang diorder stoknya sudah habis atau tidak ada",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/checkProductOrderBeforeSumbit"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Belum membuat pesanan baru",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/orderNotFound"
                  }
              }
          }
      }

      #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }
    */
    try {
      const userId = req.user.id;

      const order = await req.orderUC.updateOrderSubmitted(userId);

      if (order.isSuccess === false) {
        return res
          .status(order.statusCode)
          .json(
            resData.failed(
              order.reason,
            ),
          );
      }

      res.status(200).json(resData.success());
    } catch (e) {
      next(e);
    }
  },

  getOrderById: async (req, res, next) => {
    /*
      #swagger.tags = ['Order']
      #swagger.responses[200] = {
        description: "Berhasil mendapatkan pesanan sesuai id pesanan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successGetOrderPending"
                  }
              }
          }
      }

       #swagger.responses[404] = {
        description: "Pesanan tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/orderNotFound"
                  }
              }
          }
      }

      #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }
    */
    try {
      const { id } = req.params;

      const order = await req.orderUC.getOrderById(id);

      if (order.isSuccess === false) {
        return res.status(404).json(resData.failed(order.reason));
      }
      res.status(200).json(resData.success(order.data));
    } catch (e) {
      next(e);
    }
  },

  cancelOrderByCustomer: async (req, res, next) => {
    /*
      #swagger.tags = ['Order']
      #swagger.responses[200] = {
        description: "Berhasil membatalkan pesanan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successOrder"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Pesanan tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/orderNotFound"
                  }
              }
          }
      }

      #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }
    */
    try {
      const userId = req.user.id;

      const order = await req.orderUC.cancelOrderByCustomer(userId);

      if (order.isSuccess === false) {
        return res.status(404).json(resData.failed(order.reason));
      }
      res.status(200).json(resData.success());
    } catch (e) {
      next(e);
    }
  },
};
