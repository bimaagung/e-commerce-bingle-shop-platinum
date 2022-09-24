const express = require('express');
const userController = require('../controller/user');
const authorized = require('../middleware/jwt');
const router = express.Router();

// User 
router.get('/', authorized.customer, userController.getUserById);


module.exports = router;