const imageProductController = require("../../controller/image_product");
const resData = require("../../helper/response");

let mockImageProductUC = {
  getImageProductByProductID: jest.fn().mockReturnValue(null),
  addProductImage: jest.fn().mockReturnValue(null),
  //   updateImageProduct: jest.fn().mockReturnValue(null),
  //   deleteImageProduct: jest.fn().mockReturnValue(null),
};

const mockRequest = (
  body = {},
  query = {},
  params = {},
  file = {},
  useCases = {}
) => {
  return {
    body: body,
    query: query,
    params: params,
    file: file,
    ...useCases,
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const next = (error) => {
  console.log(error.message);
};
describe("Test upload image", () => {
  describe("createImage test", () => {
    const imageProduct = {
      // id: 10,
      url: "http://res.cloudinary.com/dnvltueqb/testURL.png",
      product_id: 3,
      updatedAt: "2022-10-14T05:15:42.095Z",
      createdAt: "2022-10-14T05:15:42.095Z",
    };

    test("should status 200 isSucces = true", async () => {
      mockImageProductUC.createImageProduct = jest
        .fn()
        .mockReturnValue({ isSuccess: true, reason: "", data: imageProduct });
      let req = mockRequest(
        {},
        {},
        {},
        {file :"http://res.cloudinary.com/dnvltueqb/testURL.png" },
        { productImageUC: mockImageProductUC }
      );
      let res = mockResponse();

      await imageProductController.addProductImage(req, res, next);

      expect(mockImageProductUC.createImageProduct).toHaveBeenCalled();
    
      expect(res.json).toBeCalledWith(resData.success(imageProduct));
    });
    // test add product failed
  });
});
