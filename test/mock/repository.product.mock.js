const mockProductRepo = (
    {
        returnGetProductByID, 
        returnUpdateProduct,
        returnGetAllProducts,
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

  repo.getAllProducts = jest.fn().mockReturnValue(
    returnGetAllProducts !== true ?  returnGetAllProducts : [
      {
        name: 'Iphone 14 Pro',
        description: 'this is product',
        category_id: 1,
        sold: 1,
        price: 23000000,
        stock: 10,
      }
    ]
  );


  return repo;
};

module.exports = mockProductRepo;