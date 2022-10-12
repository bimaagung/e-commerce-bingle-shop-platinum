const mockCategoryRepo = (
  {
      
      returnGetCategoryByID,
      returnPutCaregory,
      returnAllCategory,
      returnAddCategory,
      returnDeleteCategory
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

  repo.putCategory = jest.fn().mockReturnValue(
    returnPutCaregory !== true ? returnPutCaregory : true
)

repo.getAllCategory = jest.fn().mockReturnValue(
    returnAllCategory !== true ? returnAllCategory : [
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
  return repo
}
module.exports = mockCategoryRepo