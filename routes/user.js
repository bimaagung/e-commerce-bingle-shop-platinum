const express = require ('express')
const router = express.Router()
const handleUpload = require('../libs/handle_upload');
const user = require('../controller/user_controller')


// user
router.get('/:id',user.getOneUser)
router.put('/update-image/:id',handleUpload.upload.single('image'),user.updateAvatar)





module.exports = router;
