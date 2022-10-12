const CategoryUsecase = require("../../usecase/category")
const mockCategoryRepo = require("../mock/repositori.category.mock")

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

        test
    })
})