const resData = require('../helper/response')
const url = require('../libs/handle_upload')

module.exports = {

    getImageProductByProductID: async (req, res, next) => {
        product_id = req.params.product_id
        try {
            let image = await req.productImageUC.getImageProductByProductID(productImageUC)
            if (image.isSuccess !== true) {
                return res
                    .status(404)
                    .json(resData.failed(image.message))
            }
            res.status(200).json(resData.success(image.image))
        } catch (e) {
            next(e)
        }
    },

    addProductImage: async (req, res, next) => {
        try {
            let dataImage = ({
                url: await url.uploadCloudinaryProduct(req.file.path),
                product_id: req.body.product_id
            })
            let image = await req.productImageUC.createImageProduct(dataImage)
            if (!image.isSuccess) {
                return res
                    .status(400)
                    .json(resData.failed(image.message))
            }
            res.status(200).json(resData.success(image.image))
        } catch (e) {
            next(e)
        }
    },
    updateImageProduct: async (req, res, next) => {
        try {
            let id = req.params.id
            let dataImage = ({
                url: await url.uploadCloudinaryProduct(req.file.path),
                product_id: req.body.product_id
            })
            let image = await req.productImageUC.updateImageProduct(dataImage, id)
            if (!image.isSuccess) {
                return res
                    .status(400)
                    .json(resData.failed(image.message))
            }
            res.status(200).json(resData.success());

        } catch (e) {
            next(e)
        }
    },
    deleteImageProduct: async (req, res, next) => {
        try {
            let id = req.params.id

            let image = await req.productImageUC.deleteImageProduct(id)
            if (!image.isSuccess) {
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