const express = require('express');

const router = express.Router();
const auth = require('../controller/auth_controller');
const handleUpload = require('../libs/handle_upload');

router.post('/api/user/login', auth.login);
router.post('/api/user/register', handleUpload.upload.single('image'), auth.register);

module.exports = router;
