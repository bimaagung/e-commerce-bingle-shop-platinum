const mockCategoryRepo = (
  {
      
      returnGetCategoryByID,
  }
     
) => {

  const repo = {}

  repo.getCategoryByID = jest.fn().mockReturnValue(
      returnGetCategoryByID !== true ? returnGetCategoryByID : {
        
        id: "1",
        name: "celana"

      }
  )
  return repo
}
module.exports = mockCategoryRepo