const ProductUseCase = require("../../usecase/product");
const mockProductRepo = require("../mock/repository.product.mock");
const mockCategoryRepo = require("../mock/repository.category.mock");

//object
let productValues, categoryValues = {}
//class
let productUC = null;

describe('product', () => {
    beforeEach(() => {
        productValues = {
            returnGetProductById:true, 
            returnUpdateProduct:true,
            returnGetAllProducts:true,
            returnAddProduct:true,
            returnDeleteProduct:true,
        }
        
        categoryValues = {
          returnGetCategoryByID: true
        }

        productUC = new ProductUseCase(mockProductRepo(productValues), mockCategoryRepo(categoryValues));
    });

    describe('get all products', () => {
        test('should isSuccess  = true and data in array', async () => { 
            let res = await productUC.getAllProducts()
                
            expect(res.isSuccess).toBeTruthy()
            expect(Array.isArray(res.data)).toBeTruthy();
        })

        test('should isSuccess  = true and data = []', async () => { 
          
          const repo = mockProductRepo({
            returnGetAllProducts : [],
          })
            
            const productUC = new ProductUseCase(repo);

            let res = await productUC.getAllProducts()
            
            expect(res.isSuccess).toBeTruthy()
            expect(Array.isArray(res.data)).toBeTruthy()
            expect(res.data.length).toBe(0);
        })
    })

    describe('update products', () => {
        test('should isSuccess  = true', async () => { 
            let res = await productUC.updateProduct(1, {name: 'test'})

            expect(res.isSuccess).toBeTruthy()
        })

        test('should isSuccess  = false and reason = product not found', async () => { 
            productValues.returnGetProductByID = null
            productUC = new ProductUseCase(
                mockProductRepo(productValues)
            );
            let res = await productUC.updateProduct(1, {name: 'test'})
            
            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual('product not found');
        })
    })
    describe('get product by Id', () => {
        test ('should isSuccess  = true and data is object', async () => {
            let res = await productUC.getProductById(1)

            expect(res.isSuccess).toBeTruthy()
            expect(typeof res.data === 'object').toBeTruthy()
        })

        test('should isSuccess = false and data = null', async () => {
            productValues.returnGetProductById = null
            productUC = new ProductUseCase(
                mockProductRepo(productValues)    
            )

            let res = await productUC.getProductById()

            expect(res.isSuccess).toBeFalsy()
            expect(res.data).toEqual(null)
        })
    })



    describe('add product', () => {
        test('should isSuccess  = true and data is object', async () => {
            
            let res = await productUC.addProduct()
            
            expect(res.isSuccess).toBeTruthy();
            expect(typeof res.data === 'object').toBeTruthy();
        });

        test('should isSuccess = false and data = null', async () => {
            productValues.returnAddProduct = null
            productUC = new ProductUseCase(
                mockProductRepo(productValues)
            );

          
            let res = await productUC.addProduct({
            name: 'test',
            description: 'ini test',
            category_id: 1,
            sold: 0,
            price: 10000000,
            stock: 10,   
            })
            
            expect(res.isSuccess).toBeFalsy();
            expect(res.reason).toEqual('failed to add, category not found')
        })
    })

    describe('deleteProduct', () => {
        test('should isSuccess = true', async () => {
            let res = await productUC.deleteProduct(1)

            expect(res.isSuccess).toBeTruthy();
        })

        test('should isSuccess = false and reason = product not found', async () => {
            productValues.returnDeleteProduct = null
            productUC = new ProductUseCase(mockProductRepo)
        
            let res = await productUC.deleteProduct()

            expect(res.isSuccess).toBeFalsy()
            expect(res.reason).toEqual('Product not found')
        })
    })

    describe("update products", () => {
      test("seharusnya isSuccess  = true", async () => {
      let res = await productUC.updateProduct(1, { name: "test" });

      expect(res.isSuccess).toBeTruthy();
    });

      test("seharusnya isSuccess  = false dan reason = product not found", async () => {
      productValues.returnGetProductByID = null;
      productUC = new ProductUseCase(mockProductRepo(productValues));
      let res = await productUC.updateProduct(1, { name: "test" });

      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual("product not found");
    });
  });
  describe("get product by Id", () => {
    test("seharusnya isSuccess  = true dan data dalam object", async () => {
      let res = await productUC.getProductByID(1);

      expect(res.isSuccess).toBeTruthy();
      expect(typeof res.data === "object").toBeTruthy();
    });

    test("seharusnya isSuccess = false dan data = null", async () => {
      productValues.returnGetProductByID = null;
      productUC = new ProductUseCase(mockProductRepo(productValues));

      let res = await productUC.getProductByID();

      expect(res.isSuccess).toBeFalsy();
      expect(res.data).toEqual(null);
    });
  });

  describe("add product", () => {
    test("should isSuccess  = true and data is object", async () => {
      let res = await productUC.addProduct({
        id: 10,
        name: "ASUS ROG Phone 6 Pro 18/512Gb",
        description: "Smarphone dari asus",
        category_id: 2,
        sold: 3,
        price: 26500000,
        stock: 7,
      });

      expect(res.isSuccess).toBeTruthy();
      expect(typeof res.data === "object").toBeTruthy();
    });

    test("should isSuccess = false and data = null", async () => {
      categoryValues.returnGetCategoryByID = null;
      productUC = new ProductUseCase(
        mockProductRepo(productValues),
        mockCategoryRepo(categoryValues)
      );

      let res = await productUC.addProduct({
        name: "test",
        description: "ini test",
        category_id: 1,
        sold: 0,
        price: 10000000,
        stock: 10,
      });

      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual("failed to add, category not found");
    });
  });

  describe("deleteProduct", () => {
    test("should isSuccess = true", async () => {
      let res = await productUC.deleteProduct(1);

      expect(res.isSuccess).toBeTruthy();
    });

    test("should isSuccess = false and reason = product not found", async () => {
      productValues.returnGetProductByID = null;
      productUC = new ProductUseCase(mockProductRepo(productValues));
      let res = await productUC.deleteProduct();

      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual("product not found");
    });
  });
});
