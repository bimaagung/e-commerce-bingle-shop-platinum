const mockOrderRepo = (
    {
        returnGetListOrder, 
        returnGetListOrderMultipleQuery, 
        returnGetOrderById,
        returnGetPendingOrderByUserId,
        returnUpdateOrderSubmited,
        returnUpdateOrder,
        returnCreateOrder,
        returnVerifyOrderWithoutStatusPending,
        returnGetOrderPendingById,
    }
) => {
  const repo = {};

  repo.getListOrder = jest.fn().mockReturnValue(
    returnGetListOrder !== true ?  returnGetListOrder : [
      {
        id: 'Ti9jtWs0FHhJMAmS',
        user_id: 1,
        status: 'PENDING',
        completed_date: null,
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
      }
    ],
  );

  repo.getListOrderMultipleQuery = jest.fn().mockReturnValue(
    returnGetListOrderMultipleQuery !== true ? returnGetListOrderMultipleQuery : [
      {
        id: 'Ti9jtWs0FHhJMAmS',
        user_id: 1,
        status: 'PROCESSED',
        completed_date: null,
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
      },
      {
        id: 'Ti9jtWs0FHhJMAmS',
        user_id: 2,
        status: 'COMPLETED',
        completed_date: null,
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
      }
    ], 
  );

  repo.getOrderById = jest.fn().mockReturnValue(
    returnGetOrderById !== true ?  returnGetOrderById :  {
        id: 'Ti9jtWs0FHhJMAmS',
        user_id: 1,
        status: 'PROCESSED',
        completed_date: null,
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
        user : {
          id: '1',
          name: 'Leslie Hayes',
          username: 'Bessie_Fadel',
          telp: '08487438',
        },
        order_details: [
            {
                id: 1,
                product_id: 2,
                qty: 10,
                total_price: 25000000,
            },
        ]
      }
  );

  repo.verifyOrderWithoutStatusPending = jest.fn().mockReturnValue(
    returnVerifyOrderWithoutStatusPending !== true ?  returnVerifyOrderWithoutStatusPending : {
        id: 'Ti9jtWs0FHhJMAmS',
        user_id: 1,
        status: 'PROCESSED',
        completed_date: null,
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
      }
  );

  repo.getPendingOrderByUserId = jest.fn().mockReturnValue(
    returnGetPendingOrderByUserId !== true ?  returnGetPendingOrderByUserId : {
        id: 1,
        user_id: 1,
        status: 'PENDING',
        complete_date: null,
        qty: 10,
        total_price: 25000000,
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
        user : {
          id: '1',
          name: 'Leslie Hayes',
          username: 'Bessie_Fadel',
          telp: '08487438',
        },
        order_details: [
            {
                id: 1,
                product_id: 2,
                qty: 10,
                total_price: 25000000,
            },
        ]
    },
  );

  repo.updateOrderSubmitted = jest.fn().mockReturnValue(
    returnUpdateOrderSubmited !== true ?  returnUpdateOrderSubmited : true
  );

  repo.updateOrder = jest.fn().mockReturnValue(
    returnUpdateOrder !== true ?  returnUpdateOrder : true
  );

  repo.createOrder = jest.fn().mockReturnValue(
    returnCreateOrder !== true ?  returnCreateOrder :  {
        id: 'Ti9jtWs0FHhJMAmS',
        user_id: 1,
        status: 'PENDING',
        completed_date: null,
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
      }
  );

  repo.getOrderPendingById = jest.fn().mockReturnValue(
    returnGetOrderPendingById !== true ?  returnGetOrderPendingById : {
        id: 'Ti9jtWs0FHhJMAmS',
        user_id: 1,
        status: 'PENDING',
        completed_date: null,
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
      }
  );

  return repo;
};

module.exports = mockOrderRepo;

