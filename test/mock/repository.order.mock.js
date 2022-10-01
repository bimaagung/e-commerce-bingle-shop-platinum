const mockOrderRepo = (
    {
        returnGetListOrder, 
        returnGetListOrderMultipleQuery, 
        returnGetOrderById,
        returnGetPendingOrderByUserId,
        returnUpdateOrder
    }
) => {
  const repo = {};

  repo.getListOrder = jest.fn().mockReturnValue(
    returnGetListOrder !== undefined ?  returnGetListOrder :   {
        id: 1,
        user_id: 2,
        status: 'PENDING',
        complete_date: null,
      },
  );

  repo.getListOrderMultipleQuery = jest.fn().mockReturnValue(
    returnGetListOrderMultipleQuery !== undefined ? returnGetListOrderMultipleQuery : [
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
    returnGetOrderById !== undefined ?  returnGetOrderById : {
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

  repo.getPendingOrderByUserId = jest.fn().mockReturnValue(
    returnGetPendingOrderByUserId !== undefined ?  returnGetPendingOrderByUserId : {
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
  );

  repo.updateOrderSubmitted = jest.fn().mockReturnValue(
    returnUpdateOrder !== undefined ?  returnUpdateOrder : true
  );

  return repo;
};

module.exports = mockOrderRepo;

