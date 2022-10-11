const mockOrderDetailRepo = (
    {
        returnGetOrderDetailById,
        returnAddOrderDetails
    }
) => {
  const repo = {};

  repo.getOrderDetailById = jest.fn().mockReturnValue(
    returnGetOrderDetailById !== true ? returnGetOrderDetailById : [
        {
          id: 1,
          user_id: 1,
          order_id: 'Ti9jtWs0FHhJMAmS',
          product_id: 1,
          qty: 1,
          total_price: 25000000,
        }
    ]
  );

  repo.addOrderDetails = jest.fn().mockReturnValue(
    returnAddOrderDetails !== true ? returnAddOrderDetails : {
          id: 1,
          user_id: 1,
          order_id: 'Ti9jtWs0FHhJMAmS',
          product_id: 1,
          qty: 1,
          total_price: 25000000,
        }
  );

  return repo;
};

module.exports = mockOrderDetailRepo;