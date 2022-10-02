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
    }
) => {
  const repo = {};

  repo.getListOrder = jest.fn().mockReturnValue(
    returnGetListOrder !== true ?  returnGetListOrder : [
      {
        id: 1,
        user_id: 2,
        status: 'PENDING',
        complete_date: null,
      }
    ],
  );

  repo.getListOrderMultipleQuery = jest.fn().mockReturnValue(
    returnGetListOrderMultipleQuery !== true ? returnGetListOrderMultipleQuery : [
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
    ], 
  );

  repo.getOrderById = jest.fn().mockReturnValue(
    returnGetOrderById !== true ?  returnGetOrderById : {
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
  );

  repo.verifyOrderWithoutStatusPending = jest.fn().mockReturnValue(
    returnVerifyOrderWithoutStatusPending !== true ?  returnVerifyOrderWithoutStatusPending : {
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
    },
  );

  repo.getPendingOrderByUserId = jest.fn().mockReturnValue(
    returnGetPendingOrderByUserId !== true ?  returnGetPendingOrderByUserId : {
        id: 1,
        user_id: 1,
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
    returnCreateOrder !== true ?  returnCreateOrder : true
  );

  return repo;
};

module.exports = mockOrderRepo;

