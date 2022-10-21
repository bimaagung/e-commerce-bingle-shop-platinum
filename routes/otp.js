const express = require('express')
const router = express.Router()

const otpController = require('../controller/otp')
const validation = require('../middleware/formValidation');

router.get('/api/otp/verify', otpController.verifyOTP)
router.post('/api/otp/request', validation.generateOTP,otpController.generateOTP)




module.exports =router