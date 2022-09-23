const express = require ('express')
const router = express.Router()

const user = require('../controller/user_controller')


// user
router.get('/:id',user.getOneUser)





module.exports = router;
