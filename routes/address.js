const express = require('express')
const router = express.Router()
const address = require('../controller/address_controller')

router.get('/update/addres/:id', address.getOneAddress)

module.exports = router