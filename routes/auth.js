const express = require('express');
const router = express.Router();

// controller
const auth = require('../controller/auth');

const handleUpload = require('../libs/handle_upload');
const validation = require('../middleware/formValidation');

router.post('/api/user/login', auth.login);
router.post('/api/user/register', handleUpload.upload.single('image'), auth.register);

module.exports = router;
