const resData = require('../helper/response')
const url = require('../libs/handle_upload')

module.exports = {
    addProductImage : async (req, res, next)=>{
        try {
            let dataImage = ({
                url : await url.uploadCloudinaryProduct(req.file.path),
                product_id : req.body.product_id
            })
            let image = await req.productImageUC.createImageProduct(dataImage)
            if(!image.is_success){
                return res
                .status(400)
                .json(resData.failed(image.message))
            }
            res.json(
                resData.success({
                 url : dataImage.url,
                 product_id : dataImage.product_id
                }),
              );
        } catch (e) {
            next(e)
        }
    },
    updateImageProduct : async (req, res,next)=>{
        try {
            let id = req.params.id
            let dataImage = ({
                url : await url.uploadCloudinaryProduct(req.file.path),
                product_id : req.body.product_id
            })
            let image = await req.productImageUC.updateImageProduct(dataImage , id)
            if(!image.is_success){
                return res
                .status(400)
                .json(resData.failed(image.message))
            }
            res.json(
                resData.success({
                 url : dataImage.url,
                 product_id : dataImage.product_id
                }),
              );
            
        } catch (e) {
            next(e)
        }
    },
    deleteImageProduct : async (req, res,next)=>{
        try {
            let id = req.params.id
    
            let image = await req.productImageUC.deleteImageProduct(id)
            if(!image.is_success){
                return res
                .status(400)
                .json(resData.failed(image.message))
            }
            res.json(resData.success());
            
        } catch (e) {
            next(e)
        }
    },
    addUserImage : async (req, res, next)=>{
        try {
            let dataImage = ({
                url : await url.uploadCloudinaryAvatar(req.file.path),
                user_id : req.body.user_id
            })
            let image = await req.userImageUC.createImageUser(dataImage)
            if(!image.is_success){
                return res
                .status(400)
                .json(resData.failed(image.message))
            }
            res.json(
                resData.success({
                 url : dataImage.url,
                 user_id : dataImage.user_id
                }),
              );
        } catch (e) {
            next(e)
        }
    },
    updateImageUser: async (req, res,next)=>{
        try {
            let id = req.params.id
            let dataImage = ({
                url : await url.uploadCloudinaryAvatar(req.file.path),
                user_id : req.body.user_id
            })
            let image = await req.userImageUC.updateImageUser(dataImage , id)
            if(!image.is_success){
                return res
                .status(400)
                .json(resData.failed(image.message))
            }
            res.json(
                resData.success({
                 url : dataImage.url,
                 user_id : dataImage.user_id
                }),
              );
            
        } catch (e) {
            next(e)
        }
    },
    deleteImageProduct : async (req, res,next)=>{
        try {
            let id = req.params.id
    
            let image = await req.userImageUC.deleteImageAvatar(id)
            if(!image.is_success){
                return res
                .status(400)
                .json(resData.failed(image.message))
            }
            res.json(resData.success());
            
        } catch (e) {
            next(e)
        }
    },
}