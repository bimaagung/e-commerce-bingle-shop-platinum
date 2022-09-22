const resData = require('../helper/response')
const url = require('../libs/handle_upload')

module.exports = {
    addimage : async (req, res, next)=>{
        try {
            let dataImage = ({
                url : {},
                product_id : req.body.product_id
            })
            let urls = []
            for (let i = 0; i <req.files.length; i++){
                urls.push(await url.uploadCloudinary(req.files[i].path))
            }
            console.log(urls)
            
            let image = await req.productImageUC.createImageProduct(dataImage)
            if(!image.is_success){
                return res
                .status(400)
                .json(resData.failed(image.message))
            }
            res.status(200).json(resData.success(image))
        } catch (e) {
            next(e)
        }
    }
}