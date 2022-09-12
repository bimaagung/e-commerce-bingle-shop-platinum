const express =require('express')
const router = express.Router()
const auth = require('../controller/auth_controller')

router.post('/api/user/login', auth.login)

module.exports = router