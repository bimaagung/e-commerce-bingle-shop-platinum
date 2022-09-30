const OrderUseCase = require('../../usecase/order');
require('dotenv').config();


const mockOrderRepo = (
    {
        returnGetListOrder = null, 
        returnGetListOrderMultipleQuery = null, 
        returnGetOrderById = null,
        returnGetPendingOrderByUserId = null,
    }
) => {
  const repo = {};

  repo.getListOrder = jest.fn().mockReturnValue(
    returnGetListOrder
  );

  repo.getListOrderMultipleQuery = jest.fn().mockReturnValue(
    returnGetListOrderMultipleQuery
  );

  repo.getOrderById = jest.fn().mockReturnValue(
    returnGetOrderById
  );

  repo.getPendingOrderByUserId = jest.fn().mockReturnValue(
    returnGetPendingOrderByUserId
  );

  return repo;
};

const mockProductRepo = (
    {
        returnGetProductByID = null, 
    }
) => {
  const repo = {};

  repo.getProductByID = jest.fn().mockReturnValue(
    returnGetProductByID
  );

  return repo;
};

const orderRepo = mockOrderRepo({
    returnGetListOrder :  [
      {
        id: 1,
        user_id: 2,
        status: 'PENDING',
        complete_date: null,
      },
    ],
    returnGetListOrderMultipleQuery :  [
      {
        id: 1,
        user_id: 2,
        status: 'PENDING',
        complete_date: null,
      },
      {
        id: 1,
        user_id: 2,
        status: 'SUBMITTED',
        complete_date: null,
      },
      {
        id: 1,
        user_id: 2,
        status: 'COMPLETED',
        complete_date: null,
      },
    ],
    returnGetOrderById : 
    {
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
    },
    returnGetPendingOrderByUserId : 
    {
        id: 1,
        user_id: 2,
        status: 'PENDING',
        complete_date: null,
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
        order_details: [
            {
                id: 1,
                product_id: 2,
                qty: 10,
                total_price: 23000000,
            },
             {
                id: 1,
                product_id: 2,
                qty: 10,
                total_price: 23000000,
            },
        ]
    },
});

const productRepo = mockProductRepo({
    returnGetProductByID : 
    {
        id: 1,
        name: 'Iphone 14 Pro',
        category_id: 1,
        price: 23000000,
        stock: 10,
        sold: 0
    }
});

const orderUC = new OrderUseCase(orderRepo,null,productRepo);

describe('get list order test', () => {
  test('get list order with single query is success', async () => {
    let res = await orderUC.getListOrder('pending');
    expect(res.isSuccess).toEqual(true);
  });

  test('get list order multiple query is  success', async () => {
    let res = await orderUC.getListOrder('pending, completed, submitted');
    expect(res.isSuccess).toEqual(true);
  });

   test('get list order is success', async () => {
    let res = await orderUC.getListOrder();
    expect(res.isSuccess).toEqual(true);
  });

   test('get list order is empty', async () => {

    const repo = mockOrderRepo({
    returnGetListOrder :  [],
    returnGetListOrderMultipleQuery : [],
   });
    const orderUC = new OrderUseCase(repo);

    let res = await orderUC.getListOrder();
    expect(res.isSuccess).toEqual(true);
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

  test('get order pending by id is success', async () => {
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

  test('get order pending by user id with return status true and data object', async () => {
    let res = await orderUC.getPendingOrderByUserId(12);

    expect(res.isSuccess).toBeTruthy();
    expect(typeof res.data).toEqual('object')
    expect(Array.isArray(res.data.products)).toBeTruthy();
        
  });

  test('get order pending by user id with status false and message order pending not found', async () => {
    const repo = mockOrderRepo({ 
        returnGetPendingOrderByUserId: null,
        returnGetProductByID: null
    });

    const orderUC = new OrderUseCase(repo);

    let res = await orderUC.getPendingOrderByUserId(10);

    expect(res.isSuccess).toBeFalsy();
    expect(res.reason).toEqual('order not found');
    expect(res.data).toEqual(null);
  });

});
