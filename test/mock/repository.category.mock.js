const mockCategoryRepo = (
  {
      
      returnGetCategoryByID,
      returnUpdateCategory,
      returnGetAllCategory,
      returnAddCategory,
      returnDeleteCategory,
      returnGetDefaultCategory
  }
     
) => {

  const repo = {}

  repo.getCategoryByID = jest.fn().mockReturnValue(
      returnGetCategoryByID !== true ? returnGetCategoryByID : {
        
        id: "1",
        name: "celana",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
  )

  repo.addCategory = jest.fn().mockReturnValue(
    returnAddCategory !== true ? returnAddCategory : {
      id: "1",
      name: "celana",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  )

  repo.updateCategory = jest.fn().mockReturnValue(
    returnUpdateCategory !== true ? returnUpdateCategory : true
)

repo.getAllCategory = jest.fn().mockReturnValue(
    returnGetAllCategory !== true ? returnGetAllCategory : [
        {
          id: "1",
          name: "celana",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
    ]
)
repo.deleteCategory = jest.fn().mockReturnValue(
    returnDeleteCategory !== true ? returnDeleteCategory : true
)

repo.getDefaultCategory = jest.fn().mockReturnValue(
    returnGetDefaultCategory !== true ? returnGetDefaultCategory : [
        {
          id: "1",
          name: "celana",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
    ]
)
  return repo
}
module.exports = mockCategoryRepo