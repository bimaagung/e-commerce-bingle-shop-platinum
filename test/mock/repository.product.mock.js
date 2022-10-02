const mockProductRepo = (
    {
        returnGetProductByID, 
        returnUpdateProduct,
    }
) => {
  const repo = {};

  
  repo.getProductByID = jest.fn().mockReturnValue(
    
    returnGetProductByID !== true ? returnGetProductByID : {
        id: 1,
        name: 'Iphone 14 Pro',
        category_id: 1,
        price: 23000000,
        stock: 10,
        sold: 0
    }
  );

  repo.updateProduct = jest.fn().mockReturnValue(
    returnUpdateProduct !== true ? returnUpdateProduct : true
  );

  return repo;
};

module.exports = mockProductRepo;