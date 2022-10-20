const express = require('express')
const router = express.Router()

const otpController = require('../controllers/otp_controller')

router.get('/api/otp/verify', otpController.verifyOTP)
router.post('/api/otp/request', otpController.generateOTP)




module.exports =router