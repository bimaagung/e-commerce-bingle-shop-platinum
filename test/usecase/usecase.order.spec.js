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
      returnCreateOrder: true,
      returnVerifyOrderWithoutStatusPending: true,
      returnGetOrderPendingById: true,
    }

    productValues = {
      returnGetProductByID: true,
      returnUpdateProduct: true
    }

    orderDetailValues = {
      returnGetOrderDetailById : true,
      returnAddOrderDetails: true
    }

   orderUC = new OrderUseCase(mockOrderRepo(orderValues),mockOrderDetailRepo(orderDetailValues),mockProductRepo(productValues));
  })

  describe('getListOrder test', () => {
    test('with single query shoud success is true and type data is array', async () => {
      let res = await orderUC.getListOrder('pending');
      expect(res.isSuccess).toBeTruthy();
      expect(Array.isArray(res.data)).toBeTruthy();
    });
    
    test('with multiple query should success is true and type data is array ', async () => {
      let res = await orderUC.getListOrder('pending, completed, submitted');
      expect(res.isSuccess).toBeTruthy();
      expect(Array.isArray(res.data)).toBeTruthy();
    });

    test('without query order should success is true and type data is array', async () => {
      let res = await orderUC.getListOrder();

      expect(res.isSuccess).toBeTruthy();
      expect(Array.isArray(res.data)).toBeTruthy();
    });

    test('should type data is array and result = []', async () => {

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

  describe('getOrderById test', () => {

    test('should isSuccess is true and data type is object', async () => {
      let res = await orderUC.getOrderById(12);
      expect(res.isSuccess).toBeTruthy();
      expect(typeof res.data === 'object').toBeTruthy();
    });

    test(`should isSucess is false and reason "order is not found"`, async () => {
      const repo = mockOrderRepo({returnGetOrderById : null});
      const orderUC = new OrderUseCase(repo);

      let res = await orderUC.getOrderById(10);
      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual('order not found');
      expect(res.data).toEqual(null);
    });

  });

  describe('getPendingOrderById test', () => {

    test('should isSuccess is true and data type is object', async () => {
      let res = await orderUC.getPendingOrderById(12);

      expect(res.isSuccess).toBeTruthy();
      expect(typeof res.data === 'object').toBeTruthy();
    });

    test(`with body status order = processed should isSuccess is false and reason is "order not found"`, async () => {
      const repo = mockOrderRepo(
        { 
          returnGetOrderPendingById  : {
            id: 'Ti9jtWs0FHhJMAmS',
            user_id: 1,
            status: 'PROCESSED',
            completed_date: null,
            createdAt: "12-09-2022 23:30:00",
            updatedAt: "12-09-2022 23:30:00",
          }
        }
      );

      const orderUC = new OrderUseCase(repo);

      let res = await orderUC.getPendingOrderById(10);
      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual('order not found');
      expect(res.data).toEqual(null);
    });

    test(`should isSuccess is false and reason is "order not found"`, async () => {
      const repo = mockOrderRepo({returnGetOrderPendingById: null});

      const orderUC = new OrderUseCase(repo);

      let res = await orderUC.getPendingOrderById(10);
      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual('order not found');
      expect(res.data).toEqual(null);
    });

  });

  describe('getPendingOrderByUserId test', () => {

    test('should isSuccess is true and data type is array', async () => {
      let res = await orderUC.getPendingOrderByUserId(1);

      expect(res.isSuccess).toBeTruthy();
      expect(typeof res.data).toEqual('object')
      expect(Array.isArray(res.data.products)).toBeTruthy();
          
    });

    test(`should isSuccess is false and reason "order not found"`, async () => {
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

  describe('updateOrderSubmitted test', () => {

    test('should  isSuccess is true', async () => {
      let res = await orderUC.updateOrderSubmitted(1);

      expect(res.isSuccess).toBeTruthy();
    });

    test(`should isSuccess is false and reason is "order not found"`, async () => {
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

    test("when product not found or stock product is empty should isSuccess is false and reason is 'recheck the product, make sure the product is still in stock'", async () => {
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

  describe('createOrder test', () => {
    test('should isSucess is true and data type is object', async () => {
      orderValues.returnGetPendingOrderByUserId = null
      orderUC = new OrderUseCase(
        mockOrderRepo(orderValues),
        mockOrderDetailRepo(orderDetailValues), 
        mockProductRepo(productValues)
      );

      let res = await orderUC.createOrder(1,1, [{ id:1, qty: 1}]);

      expect(res.isSuccess).toBeTruthy();
      expect(typeof res.data === 'object').toBeTruthy();
    });

    test("should isSucess is false and reason is 'user already has pending order'", async () => {
      orderUC = new OrderUseCase(
        mockOrderRepo(orderValues),
        mockOrderDetailRepo(orderDetailValues), 
        mockProductRepo(productValues)
      );

      let res = await orderUC.createOrder(1,1, [{ id:1, qty: 1}]);

      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual('user already has pending order');
    });

    test("should isSuccess is false message is 'can\'t process the order, please check each product in order'", async () => {
      orderValues.returnGetPendingOrderByUserId = null;
      productValues.returnGetProductByID = null;
      productValues = {
      returnGetProductByID: null,
      returnUpdateProduct: true
      }

      orderUC = new OrderUseCase(
        mockOrderRepo(orderValues),
        mockOrderDetailRepo(orderDetailValues), 
        mockProductRepo(productValues)
      );
      let res = await orderUC.createOrder(1,1, [{ id:1, qty: 1}]);

      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual('can\'t process the order, please check each product in order');
    });

  });

  describe('updateStatusOrder test', () => {
      test('when param status is processed should isSuccess is true', async () => {
        let res = await orderUC.updateStatusOrder(1,'ORDER_PROCESSED');

        expect(res.isSuccess).toBeTruthy();
        expect(res.statusCode).toEqual(200);
      });

      test('when param status is completed should isSuccess is true', async () => {
        let res = await orderUC.updateStatusOrder(1,'ORDER_COMPLETED');

        expect(res.isSuccess).toBeTruthy();
      });

      test('when param status is canceled should isSuccess is true and updated return stock', async () => {
        let res = await orderUC.updateStatusOrder(1,'ORDER_CANCELED');

        expect(res.isSuccess).toBeTruthy();
      });

      test(`should isSuccess is false and reason is "orders without pending status not found"`, async () => {
        orderValues.returnVerifyOrderWithoutStatusPending = null;
        orderUC = new OrderUseCase(
          mockOrderRepo(orderValues),
          mockOrderDetailRepo(orderDetailValues), 
          mockProductRepo(productValues)
        );

        let res = await orderUC.updateStatusOrder(2,'ORDER_PROCESSED');

        expect(res.isSuccess).toBeFalsy();
        expect(res.reason).toEqual('orders without pending status not found');
      });

      test(`should isSuccess is true and reason is "request status outside the specified options"`, async () => {
        orderUC = new OrderUseCase(
          mockOrderRepo(orderValues),
          mockOrderDetailRepo(orderDetailValues), 
          mockProductRepo(productValues)
        );

        let res = await orderUC.updateStatusOrder(1,'WAITING');

        expect(res.isSuccess).toBeFalsy();
        expect(res.reason).toEqual('request status outside the specified options');
      });
  });

  describe(`addProductInDetailOrder test`, () => {
      test('should return array product id with length > 0 ', async () => {
        let res = await orderUC.addProductInDetailOrder(1,1,[
            {
              id:1,
              qty:1
            }
          ]
        );

        expect(Array.isArray(res)).toBeTruthy();
        expect(res.length).toBeGreaterThan(0);
      });
       test('should return empty array product id with length = 0 ', async () => {
        productValues.returnGetProductByID = null
        orderUC = new OrderUseCase(
          mockOrderRepo(orderValues),
          mockOrderDetailRepo(orderDetailValues), 
          mockProductRepo(productValues)
        );
        let res = await orderUC.addProductInDetailOrder(1,1,[
            {
              id:2,
              qty:1
            }
          ]
        );

        expect(Array.isArray(res)).toBeTruthy();
        expect(res).toEqual([]);
      });
  });

  describe(`getProductByOrderDetail test`, () => {
      test('should return array product id with length > 0 ', async () => {
        let res = await orderUC.getProductByOrderDetail([
            {
              product_id:1,
              qty:1,
              total_price: 25000000
            }
          ]
        );

        expect(Array.isArray(res)).toBeTruthy();
        expect(res.length).toBeGreaterThan(0);
      });
       test('when product not found should return empty array product id with length = 0 ', async () => {
        productValues.returnGetProductByID = null
        orderUC = new OrderUseCase(
          mockOrderRepo(orderValues),
          mockOrderDetailRepo(orderDetailValues), 
          mockProductRepo(productValues)
        );
        let res = await orderUC.getProductByOrderDetail([
             {
              product_id:2,
              qty:1,
              total_price: 25000000
            }
          ]
        );

        expect(Array.isArray(res)).toBeTruthy();
        expect(res).toEqual([]);
      });
  });

  describe(`updateStockSoldProduct test`, () => {
      test('should return array product id with length > 0 ', async () => {
        let res = await orderUC.updateStockSoldProduct(1,'SUBMITTED');

        expect(Array.isArray(res)).toBeTruthy();
        expect(res.length).toBeGreaterThan(0);
      });

       test('when product not found should return empty array product id with length = 0 ', async () => {
        productValues.returnGetProductByID = null
        orderUC = new OrderUseCase(
          mockOrderRepo(orderValues),
          mockOrderDetailRepo(orderDetailValues), 
          mockProductRepo(productValues)
        );
        let res = await orderUC.updateStockSoldProduct(2,'SUBMITTED');

        expect(Array.isArray(res)).toBeTruthy();
        expect(res).toEqual([]);
      });
  });
});


