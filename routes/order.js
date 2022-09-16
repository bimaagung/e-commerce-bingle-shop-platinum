const express = require('express')
const orderController = require('../controller/order')
const authorize = require('../middleware/jwt')

const router = express.Router()
router.post('/create', authorize, orderController.createOrder)
router.get('/pending/', authorize, orderController.getPendingOrderByUserId)

module.exports = router
