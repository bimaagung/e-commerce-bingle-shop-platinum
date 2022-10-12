const CategoryUsecase = require("../../usecase/category")
const mockCategoryRepo = require("../mock/repositori.category.mock");

let categoryvalues = {};
let categoryUC = null

describe("category", () => {

    beforeEach(() => {
        categoryvalues = {
        returnGetCategoryByID: true,
        returnPutCategory: true,
        returnGetAllCategory: true,
        returnAddCategory: true,
        returnDeleteCategory: true,
        }
        categoryUC = new CategoryUsecase(
            mockCategoryRepo(categoryvalues)
        )
    })
    describe("get all category", () => {
        test("seharusnya isSuccess = true dan data dalam array", async () => {
            let res = await categoryUC.getAllCategory()

            expect(res.isSuccess).toBeTruthy()
        })

        test("seharusnya isSuccess = true dan data = []", async () => {
            categoryvalues.returnGetAllCategory= null;
            categoryUC = new CategoryUsecase(mockProductRepo(categoryvalues));
      
            let res = await categoryUC.getAllCategory();
      
            expect(res.isSuccess).toBeTruthy();
            expect(res.reason).toEqual("list is empty");
            expect(res.data).toEqual([]);
          });
        });
      
        describe("put category", () => {
          test("seharusnya isSuccess  = true", async () => {
            let res = await categoryUC.putCategory(1, { name: "test" });
      
            expect(res.isSuccess).toBeTruthy();
          });
      
          test("seharusnya isSuccess  = false dan reason = category not found", async () => {
            categoryvalues.returnGetAllCategory = null;
            categoryUC = new CategoryUsecase(mockCategoryRepo(categoryvalues));
            let res = await categoryUC.updateCategory(1, { name: "test" });
      
            expect(res.isSuccess).toBeFalsy();
            expect(res.reason).toEqual("category not found");
          });
        });
        describe("get category by Id",() => {
          test("seharusnya isSuccess  = true dan data dalam object", async () => {
            let res = await categoryUC.getProductByID(1);
      
            expect(res.isSuccess).toBeTruthy();
            expect(typeof res.data === "object").toBeTruthy();
          });
      
          test("seharusnya isSuccess = false dan data = null", async () => {
            categoryvalues = null;
            categoryUC = new CategoryUsecase(mockCategoryRepo(categoryvalues));
      
            let res = await categoryUC.getCategoryByID();
      
            expect(res.isSuccess).toBeFalsy();
            expect(res.data).toEqual(null);
          });
        });
      
        describe("add category", () => {
          test("should isSuccess  = true and data is object", async () => {
            let res = await categoryUC.addCategory({
                id: "1",
                name: "celana",
            });
      
            expect(res.isSuccess).toBeTruthy();
            expect(typeof res.data === "object").toBeTruthy();
          });
      
          test("should isSuccess = false and data = null", async () => {
            categoryvalues.returnGetCategoryByID = null
            categoryUC = new CategoryUsecase (
               mockCategoryRepo(categoryvalues),
                  mockCategoryRepo(categoryvalues)
              )
      
            let res = await categoryUC.addCategory({
                id: "1",
                name: "celana",
            });
      
            expect(res.isSuccess).toBeFalsy();
            expect(res.reason).toEqual("failed to add, category not found");
          });
        });
      
        describe("deleteCategory", () => {
          test("should isSuccess = true", async () => {
            let res = await categoryUC.deleteCategory(1);
      
            expect(res.isSuccess).toBeTruthy();
          });
      
          test("should isSuccess = false and reason = category not found", async () => {
            categoryvalues.returnGetCategoryByID = null
            categoryUC = new CategoryUsecase(mockCategoryRepo(categoryvalues));
            let res = await categoryUC.deleteCategory();
      
            expect(res.isSuccess).toBeFalsy();
            expect(res.reason).toEqual("category not found");
          });
        });
      });