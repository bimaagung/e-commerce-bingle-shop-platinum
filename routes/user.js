const express = require('express');

const router = express.Router();
const handleUpload = require('../libs/handle_upload');
const userController = require('../controller/user');
const authorized = require('../middleware/jwt');

// user
router.get('/:id', userController.getOneUser);
router.put('/update-image/:id', handleUpload.upload.single('image'), userController.updateAvatar);

router.get('/', authorized.customer, userController.getOneUser);
router.put('/update/:id', authorized.customer, userController.updateUser);

module.exports = router;
