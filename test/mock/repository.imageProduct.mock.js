const mockProductImageRepo = (
    {
        returnGetImageByID,
        returnGetAllImageByProductID,
        returnCreateImage,
        returnUpdateImage,
        returnDeleteImage,
        returnGetCoverImage
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

    repo.getCoverImage = jest.fn().mockReturnValue(
        returnGetCoverImage !== true? returnGetCoverImage :   {
            id: 1,
            url: "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg",
            cover_image: true,
            product_id: 1,
            createdAt: "12-09-2022 23:30:00",
            updatedAt: "12-09-2022 23:30:00",
        }
    )



    return repo
}

module.exports = mockProductImageRepo


