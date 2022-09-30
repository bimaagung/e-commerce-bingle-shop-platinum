const mockOrderRepo = (
    {
        returnGetListOrder = null, 
        returnGetListOrderMultipleQuery = null, 
        returnGetOrderById = null,
        returnGetPendingOrderByUserId = null,
        returnUpdateOrder = null
    }
) => {
  const repo = {};

  repo.getListOrder = jest.fn().mockReturnValue(
    returnGetListOrder !== null ?  returnGetListOrder :   {
        id: 1,
        user_id: 2,
        status: 'PENDING',
        complete_date: null,
      },
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

  repo.updateOrder = jest.fn().mockReturnValue(
    returnUpdateOrder
  );

  return repo;
};

module.exports = mockOrderRepo;

