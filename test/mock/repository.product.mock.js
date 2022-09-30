mockProductRepo = (
    {
        returnGetProductByID, 
    }
) => {
  const repo = {};

  repo.getProductByID = jest.fn().mockReturnValue(
    returnGetProductByID !== undefined ? returnGetProductByID : {
        id: 1,
        name: 'Iphone 14 Pro',
        category_id: 1,
        price: 23000000,
        stock: 10,
        sold: 0
    }
  );

  return repo;
};

module.exports = mockProductRepo;