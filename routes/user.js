const express = require ('express')
const router = express.Router()
const image = require('../controller/image')
const user = require('../controller/user_controller')
const handleUpload = require('../libs/handle_upload');

// user
router.get('/:id',user.getOneUser)




// image
router.post('/add-image/product',handleUpload.upload.single('url') ,image.addProductImage)
router.put('/update-image/product/:id',handleUpload.upload.single('url') ,image.updateImageProduct)
router.delete('/delete-image/product/:id',image.deleteImageProduct)

router.post('/add-image/user',handleUpload.upload.single('url') ,image.addUserImage)
router.put('/update-image/user/:id',handleUpload.upload.single('url') ,image.updateImageUser)
router.delete('/delete-image/user/:id', image.updateImageUser)



module.exports = router;
