mockOrderDetailRepo = (
    {
        returnGetOrderDetailById, 
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

  return repo;
};

module.exports = mockOrderDetailRepo;