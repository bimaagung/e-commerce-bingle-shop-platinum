const express = require ('express')
const router = express.Router()
const productImage = require('../controller/image')
const handleUpload = require('../libs/handle_upload');


router.post('/add-image',handleUpload.upload.single('url') ,productImage.addProductImage)
router.put('/update-image/:id',handleUpload.upload.single('url') ,productImage.updateImageProduct)
router.delete('/delete-image/:id',productImage.deleteImageProduct)
module.exports = router;
