const OrderUseCase = require('../../usecase/order');
const mockOrderRepo = require('../mock/repository.order.mock') 
const mockProductRepo = require('../mock/repository.product.mock') 
const mockOrderDetailRepo = require('../mock/respository.order_detail.mock') 
require('dotenv').config();

let orderValues, productValues, orderDetailValues = {}
let orderUC = null

describe('orders', () => {

  beforeEach(() => {
    orderValues = {
      returnGetListOrder : true,  
      returnGetListOrderMultipleQuery: true, 
      returnGetOrderById : true,
      returnGetPendingOrderByUserId: true,
      returnUpdateOrderSubmited: true,
      returnUpdateOrder: true,
    }

    productValues = {
      returnGetProductByID: true,
      returnUpdateProduct: true
    }

    orderDetailValues = {
      returnGetOrderDetailById : true,
    }

    orderUC = new OrderUseCase(mockOrderRepo(orderValues),mockOrderDetailRepo(orderDetailValues),mockProductRepo(productValues));
  })

  describe('get list order test', () => {
    test('get list order with single query shoud success is true and type data is array', async () => {
      let res = await orderUC.getListOrder('pending');
      expect(res.isSuccess).toBeTruthy();
      expect(Array.isArray(res.data)).toBeTruthy();
    });

    test('get list order multiple query should success is true and type data is array ', async () => {
      let res = await orderUC.getListOrder('pending, completed, submitted');
      expect(res.isSuccess).toBeTruthy();
      expect(Array.isArray(res.data)).toBeTruthy();
    });

    test('get list order should success is true and type data is array', async () => {
      let res = await orderUC.getListOrder();

      expect(res.isSuccess).toBeTruthy();
      expect(Array.isArray(res.data)).toBeTruthy();
    });

    test('get list order should type data is array and result = []', async () => {

      const repo = mockOrderRepo({
      returnGetListOrder :  [],
      returnGetListOrderMultipleQuery : [],
    });
      const orderUC = new OrderUseCase(repo);

      let res = await orderUC.getListOrder();

      expect(res.isSuccess).toBeTruthy();
      expect(Array.isArray(res.data)).toBeTruthy();
      expect(res.data.length).toBe(0);
    });
  });

  describe('get order by id test', () => {

    test('get order by is success', async () => {
      let res = await orderUC.getOrderById(12);
      expect(res.isSuccess).toBeTruthy();
      expect(res.data).toMatchObject({
          id: 1,
          user_id: 2,
          status: 'PENDING',
          complete_date: null,
          qty: 1,
          total_prize: 23000000,
          user: {
              id: 1,
              name: 'Bima'
          },
          order_details: [
              {
                  id: 1,
                  name: 'Iphone 14 Pro',
                  category: 'Smarphone',
                  prize: 23000000,
                  stock: 10,
              }
          ]
      })
    });

    test('get order by id with order is not found', async () => {
      const repo = mockOrderRepo({returnGetOrderById : null});
      const orderUC = new OrderUseCase(repo);

      let res = await orderUC.getOrderById(10);
      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual('order not found');
      expect(res.data).toEqual(null);
    });

  });

  describe('get order pending by id test', () => {

    test('get order pending by id is success is true and data is return value true', async () => {
      let res = await orderUC.getPendingOrderById(12);
      expect(res.isSuccess).toBeTruthy();
      expect(res.data).toMatchObject({
          id: 1,
          user_id: 2,
          status: 'PENDING',
          complete_date: null,
          qty: 1,
          total_prize: 23000000,
          user: {
              id: 1,
              name: 'Bima'
          },
          order_details: [
              {
                  id: 1,
                  name: 'Iphone 14 Pro',
                  category: 'Smarphone',
                  prize: 23000000,
                  stock: 10,
              }
          ]
      })
    });

    test('get order pending by id with order status processed is not found', async () => {
      const repo = mockOrderRepo({ 
          returnGetOrderById  : {
          id: 1,
          user_id: 2,
          status: 'PROCESSED',
          complete_date: null,
          qty: 1,
          total_prize: 23000000,
          user: {
              id: 1,
              name: 'Bima'
          },
          order_details: [
              {
                  id: 1,
                  name: 'Iphone 14 Pro',
                  category: 'Smarphone',
                  prize: 23000000,
                  stock: 10,
              }
          ]
      }});

      const orderUC = new OrderUseCase(repo);

      let res = await orderUC.getPendingOrderById(10);
      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual('order not found');
      expect(res.data).toEqual(null);
    });

    test('get order pending by id with param null should message order not found', async () => {
      const repo = mockOrderRepo({returnGetOrderById: null});

      const orderUC = new OrderUseCase(repo);

      let res = await orderUC.getPendingOrderById(10);
      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual('order not found');
      expect(res.data).toEqual(null);
    });

  });

  describe('get order pending by user id test', () => {

    test('get order pending by user id with return status true and data type of array', async () => {
      let res = await orderUC.getPendingOrderByUserId(1);

      expect(res.isSuccess).toBeTruthy();
      expect(typeof res.data).toEqual('object')
      expect(Array.isArray(res.data.products)).toBeTruthy();
          
    });

    test('get order pending by user id with status false and message order pending not found', async () => {
      orderValues.returnGetPendingOrderByUserId = null
      productValues.returnGetProductByID = null
      orderUC = new OrderUseCase(
        mockOrderRepo(orderValues),
        mockOrderDetailRepo(orderDetailValues), 
        mockProductRepo(productValues)
      );

      let res = await orderUC.getPendingOrderByUserId(10);

      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual('order not found');
    });

  });

  describe('update order submitted test', () => {

    test('update order submitted should  success is true', async () => {
      let res = await orderUC.updateOrderSubmitted(1);

      expect(res.isSuccess).toBeTruthy();
    });

    test("update order submitted should  message is 'order not found'", async () => {
      orderValues.returnGetPendingOrderByUserId = null
      orderUC = new OrderUseCase(
        mockOrderRepo(orderValues),
        mockOrderDetailRepo(orderDetailValues), 
        mockProductRepo(productValues)
      );

      let res = await orderUC.updateOrderSubmitted(2);

      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual('order not found');
    });

    test("update order submitted should message is 'recheck the product, make sure the product is still in stock'", async () => {
      productValues.returnGetProductByID = null
      orderUC = new OrderUseCase(
        mockOrderRepo(orderValues),
        mockOrderDetailRepo(orderDetailValues), 
        mockProductRepo(productValues)
      );


      let res = await orderUC.updateOrderSubmitted(10);

      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual('recheck the product, make sure the product is still in stock');
    });

  });

  describe('create order test', () => {

    test('return should success is true and type data is object', async () => {
      let res = await orderUC.createOrder();

      expect(res.isSuccess).toBeTruthy();
    });

    test("return should message is 'order not found'", async () => {
      orderValues.returnGetPendingOrderByUserId = null
      orderUC = new OrderUseCase(
        mockOrderRepo(orderValues),
        mockOrderDetailRepo(orderDetailValues), 
        mockProductRepo(productValues)
      );

      let res = await orderUC.updateOrderSubmitted(2);

      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual('order not found');
    });

    test("update order submitted should message is 'recheck the product, make sure the product is still in stock'", async () => {
      productValues.returnGetProductByID = null
      orderUC = new OrderUseCase(
        mockOrderRepo(orderValues),
        mockOrderDetailRepo(orderDetailValues), 
        mockProductRepo(productValues)
      );


      let res = await orderUC.updateOrderSubmitted(10);

      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual('recheck the product, make sure the product is still in stock');
    });

  });

  
});


