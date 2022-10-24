const mockProductImageRepo = (
    {
        returnGetImageByID,
        returnGetAllImageByProductID,
        returnCreateImage,
        returnUpdateImage,
        returnDeleteImage
    }
)=>{
    const repo = {}
    repo.getImageByID = jest.fn().mockReturnValue(
        returnGetImageByID !== true ? returnGetImageByID:{
            id: 1,
            url: "url_image_example",
            product_id: 1
        }
    )
    repo.getAllImageByProductID = jest.fn().mockReturnValue(
        returnGetAllImageByProductID !== true ? returnGetAllImageByProductID :[
            {
            id: 1,
            url: "url_image_example",
            product_id: 1
            }
        ]
    )
    repo.createImage = jest.fn().mockReturnValue(
        returnCreateImage !== true ? returnCreateImage : {
            
                id: 1,
                url: "url_image_example",
                product_id: 1
                
        }
    )
    repo.updateImage = jest.fn().mockReturnValue(
        returnUpdateImage !== true ? returnUpdateImage : true
    )
    repo.deleteImage = jest.fn().mockReturnValue(
        returnDeleteImage !== true? returnDeleteImage : true
    )

    return repo
}

module.exports = mockProductImageRepo


