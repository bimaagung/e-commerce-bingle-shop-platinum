const express = require('express');

const router = express.Router();
const auth = require('../controller/auth_controller');
const handleUpload = require('../libs/handle_upload');
const validation = require('../middleware/formValidation');

router.post('/api/user/login', validation.login, auth.login);
router.post('/api/user/register', validation.register, handleUpload.upload.single('image'), auth.register);

module.exports = router;
