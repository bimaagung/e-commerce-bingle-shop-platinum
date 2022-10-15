const mockProductRepo = (
    {
        returnGetProductById, 
        returnUpdateProduct,
        returnGetAllProducts,
        returnAddProduct,
        returnDeleteProduct
    }
) => {

  const repo = {};

  
  repo.getProductById = jest.fn().mockReturnValue(
    returnGetProductById !== true ? returnGetProductById : {
        id: 10,
        name: 'ASUS ROG Phone 6 Pro 18/512Gb',
        description: 'Smarphone dari asus',
        category_id: 2,
        sold: 3,
        price: 26500000,
        stock: 7,
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
        ProductImage: [
          {
            id: 1,
            url: null,
            product_id: 10,
            createdAt: "12-09-2022 23:30:00",
            updatedAt: "12-09-2022 23:30:00",

          }
        ]
    }
  );
  repo.addProduct = jest.fn().mockReturnValue(
    returnAddProduct !== true ? returnAddProduct : {
      id: 10,
      name: 'ASUS ROG Phone 6 Pro 18/512Gb',
      description: 'Smarphone dari asus',
      category_id: 2,
      sold: 3,
      price: 26500000,
      stock: 7,
    }
  )

  repo.updateProduct = jest.fn().mockReturnValue(
    returnUpdateProduct !== true ? returnUpdateProduct : true
  );

  repo.getAllProducts = jest.fn().mockReturnValue(
    returnGetAllProducts !== true ?  returnGetAllProducts : [
      {
        id: 1,
        name: 'Iphone 13 Pro',
        description: 'Smarphone dari apple',
        category_id: 1,
        sold: 10,
        price: 25000000,
        stock: 10,
        image: null,
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00",
      }
    ]
  );
  repo.deleteProduct = jest.fn().mockReturnValue(
    returnDeleteProduct !== true ? returnDeleteProduct : true
)

  repo.addProduct = jest.fn().mockReturnValue(
    returnAddProduct !== true ? returnAddProduct : {
      id: 10,
        name: 'ASUS ROG Phone 6 Pro 18/512Gb',
        description: 'Smarphone dari asus',
        category_id: 2,
        sold: 3,
        price: 26500000,
        stock: 7,
        image: null,
        createdAt: "12-09-2022 23:30:00",
        updatedAt: "12-09-2022 23:30:00"
    }
  )

  repo.deleteProduct = jest.fn().mockReturnValue(
    returnDeleteProduct !== true ?  returnDeleteProduct : true
    )


  return repo;
};

module.exports = mockProductRepo;