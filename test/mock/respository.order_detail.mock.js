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
            user_id: 1,
            order_id: 1,
            product_id: 1,
            qty: 2,
            total_price: 43000000,
        }
    ]
  );

  repo.addOrderDetails = jest.fn().mockReturnValue(
    returnAddOrderDetails !== true ? returnAddOrderDetails : true
  );

  return repo;
};

module.exports = mockOrderDetailRepo;