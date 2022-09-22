const express = require('express');
const orderController = require('../controller/order');
const authorized = require('../middleware/jwt');

const router = express.Router();
router.post('/create', authorized.customer, orderController.createOrder);
router.get('/pending/', authorized.customer, orderController.getPendingOrderByUserId);
router.patch('/submit/', authorized.customer, orderController.submitOrder);

module.exports = router;
