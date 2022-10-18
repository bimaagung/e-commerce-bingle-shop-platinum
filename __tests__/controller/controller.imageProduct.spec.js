const imageProductController = require("../../controller/image_product");
const resData = require("../../helper/response");
const urlImage = require('../../internal/constant/defaultImage')
let mockImageProductUC = {
  getImageProductByProductID: jest.fn().mockReturnValue(null),
  addProductImage: jest.fn().mockReturnValue(null),
  updateImageProduct: jest.fn().mockReturnValue(null),
  deleteImageProduct: jest.fn().mockReturnValue(null),
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
      url: urlImage.DEFAULT_PRODUCT_IMAGE,
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
        { file: urlImage.DEFAULT_PRODUCT_IMAGE },
        { productImageUC: mockImageProductUC }
      );
      let res = mockResponse();

      await imageProductController.addProductImage(req, res, next);

      expect(mockImageProductUC.createImageProduct).toHaveBeenCalled();

      expect(res.json).toBeCalledWith(resData.success(imageProduct));
    });
    test("should status 400 isSucces = false data ", async () => {
      mockImageProductUC.createImageProduct = jest
        .fn()
        .mockReturnValue({ isSuccess: false, reason: "failed add image, product not found", data: null });
      let req = mockRequest(
        {},
        {},
        {},
        { file: urlImage.DEFAULT_PRODUCT_IMAGE },
        { productImageUC: mockImageProductUC }
      );
      let res = mockResponse();

      await imageProductController.addProductImage(req, res, next);

      expect(mockImageProductUC.createImageProduct).toHaveBeenCalled();

      expect(res.json).toBeCalledWith(resData.failed("failed add image, product not found"));
    });
  });
  describe("get image by product id ", () => {
    const imageProduct = [{
      id: 1,
      url: 'https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg',
      product_id: 1,
      updatedAt: "2022-10-14T05:15:42.095Z",
      createdAt: "2022-10-14T05:15:42.095Z",
    }]

    test("should status 200 isSucces = true", async () => {
      mockImageProductUC.getImageProductByProductID = jest
        .fn()
        .mockReturnValue({ isSuccess: true, reason: "", data: imageProduct });
      let req = mockRequest(
        {},
        {},
        {},
        {},
        { productImageUC: mockImageProductUC }
      );
      let res = mockResponse();

      await imageProductController.getImageProductByProductID(req, res, next);

      expect(mockImageProductUC.getImageProductByProductID).toHaveBeenCalled();
      expect(res.json).toBeCalledWith(resData.success(imageProduct));
    })
    test("should status 200 isSucces = true data empty []", async () => {
      mockImageProductUC.getImageProductByProductID = jest
        .fn()
        .mockReturnValue({ isSuccess: true, reason: "", data: [] });
      let req = mockRequest(
        {},
        {},
        {},
        {},
        { productImageUC: mockImageProductUC }
      );
      let res = mockResponse();

      await imageProductController.getImageProductByProductID(req, res, next);

      expect(mockImageProductUC.getImageProductByProductID).toHaveBeenCalled();
      expect(res.json).toBeCalledWith(resData.success([]));
    })
  });
  describe("update image by product id ", () => {
    const imageProduct = [{
      id: 1,
      url: 'https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg',
      product_id: 1,
      updatedAt: "2022-10-14T05:15:42.095Z",
      createdAt: "2022-10-14T05:15:42.095Z",
    }]

    test("should status 200 isSucces = true", async () => {
      mockImageProductUC.updateImageProduct = jest
        .fn()
        .mockReturnValue({ isSuccess: true, reason: "", data: imageProduct });
      let req = mockRequest(
        {},
        {},
        {},
        { file: urlImage.DEFAULT_PRODUCT_IMAGE },
        { productImageUC: mockImageProductUC }
      );
      let res = mockResponse();

      await imageProductController.updateImageProduct(req, res, next);

      expect(mockImageProductUC.updateImageProduct).toHaveBeenCalled();

      expect(res.json).toBeCalledWith(resData.success());
    })

    test("should status 404 isSucces = true", async () => {
      mockImageProductUC.updateImageProduct = jest
        .fn()
        .mockReturnValue({ isSuccess: false, reason: "image not found", data: imageProduct });
      let req = mockRequest(
        {},
        {},
        {},
        { file: urlImage.DEFAULT_PRODUCT_IMAGE },
        { productImageUC: mockImageProductUC }
      );
      let res = mockResponse();

      await imageProductController.updateImageProduct(req, res, next);

      expect(mockImageProductUC.updateImageProduct).toHaveBeenCalled();

      expect(res.json).toBeCalledWith(resData.failed("image not found"));
    })

  })
  describe("delete image", () => {
    test("should status 200 isSucces = true", async () => {
      mockImageProductUC.deleteImageProduct = jest
        .fn()
        .mockReturnValue({ isSuccess: true, reason: "", data: null });
      let req = mockRequest(
        {},
        {},
        {},
        {},
        { productImageUC: mockImageProductUC }
      );
      let res = mockResponse();

      await imageProductController.deleteImageProduct(req, res, next);

      expect(mockImageProductUC.deleteImageProduct).toHaveBeenCalled();

      expect(res.json).toBeCalledWith(resData.success());
    })

    test("should status 404 isSucces = true", async () => {
      mockImageProductUC.deleteImageProduct = jest
        .fn()
        .mockReturnValue({ isSuccess: false, reason: "image not found", data: null });
      let req = mockRequest(
        {},
        {},
        {},
        {},
        { productImageUC: mockImageProductUC }
      );
      let res = mockResponse();

      await imageProductController.deleteImageProduct(req, res, next);

      expect(mockImageProductUC.deleteImageProduct).toHaveBeenCalled();

      expect(res.json).toBeCalledWith(resData.failed("image not found"));
    })
  })
})