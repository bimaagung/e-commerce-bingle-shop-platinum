const imageProductController = require("../../controller/image_product");
const resData = require("../../helper/response");

let mockImageProductUC = {
  getImageProductByProductID: jest.fn().mockReturnValue(null),
  addProductImag: jest.fn().mockReturnValue(null),
  createImageProduct: jest.fn().mockReturnValue(null),
//   updateImageProduct: jest.fn().mockReturnValue(null),
//   deleteImageProduct: jest.fn().mockReturnValue(null),
};

const mockRequest =(body={}, query={}, params={}, useCases={}) => {
    return {
        body: body,
        query: query,
        params: params,
        ...useCases
    }
}

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const next = (error) =>{
    console.log(error.message)
  };
describe("Test upload image", () => {
  describe("createImage test", () => {
    const imageProduct = {
      id: 10,
      url: "http://res.cloudinary.com/dnvltueqb/image/upload/v1665724533/product/1665724539897_data_14_background-zoom-rumah-spongebob-19_mxqzsa.jpg",
      product_id: 3,
      updatedAt: "2022-10-14T05:15:42.095Z",
      createdAt: "2022-10-14T05:15:42.095Z",
    };

    test("should statu 200 isSucces = true", async () => {
      mockImageProductUC.createImageProduct = jest.fn().mockReturnValue({ isSuccess: false, reason: "", data: imageProduct });
      let req = mockRequest({},{},{},{},{ productImageUC:mockImageProductUC })
      let res = mockResponse();

      await imageProductController.addProductImage(req, res, next);
      
      expect(mockImageProductUC.createImageProduct).toHaveBeenCalled();
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(resData.success(imageProduct));
    });
    // test add product failed
  });
    describe('get Image product test', ()=>{
        const imageProduct = [
            {
            id: 10,
            url: "http://res.cloudinary.com/dnvltueqb/image/upload/v1665724533/product/1665724539897_data_14_background-zoom-rumah-spongebob-19_mxqzsa.jpg",
            product_id: 3,
            updatedAt: "2022-10-14T05:15:42.095Z",
            createdAt: "2022-10-14T05:15:42.095Z",
          }
        ]
          test("get empty image product", async () => {
            mockImageProductUC.getImageProductByProductID = jest.fn().mockReturnValue(
                {isSuccess : true, reason:null , data : []}
            )
          let req = mockRequest({product_id : 3},{}, {}, {
            productImageUC: mockImageProductUC
        })
        let res = mockResponse()

        await imageProductController.getImageProductByProductID(req, res, next)
        expect(mockImageProductUC.getImageProductByProductID).toBeCalledWith()
        expect(res.json).toBeCalledWith([])
          });
    })
  })
