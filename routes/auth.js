const express =require('express')
const router = express.Router()
const auth = require('../controller/auth_controller')

router.post('/api/user/login', auth.login)
router.post('/api/user/register', auth.register)


module.exports = router