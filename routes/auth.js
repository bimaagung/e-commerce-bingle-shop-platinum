const express = require('express');

const router = express.Router();

// controller
const auth = require('../controller/auth');
const oauth = require('../controller/oauth')

const handleUpload = require('../libs/handle_upload');
const validation = require('../middleware/formValidation');

// TODO UPDATE VALIDATION LOGIN
router.post('/api/user/login', auth.login);
// TODO UPDATE VALIDATION Register OTP
router.post('/api/user/register', handleUpload.upload.single('image'), auth.register);

// OAUTH GOOGLE
router.get('/login/google', oauth.loginWithGooglePage)
router.post('/login/google', validation.loginWithGoogle, oauth.loginWithGoogle)

module.exports = router;