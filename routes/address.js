const express = require('express');

const router = express.Router();
const address = require('../controller/address');
const authorized = require('../middleware/jwt');
const validation = require('../middleware/formValidation');

router.get('/:id', authorized.customer, address.getAddressByID);
router.get('/', address.getAllAddress);
router.post('/create', authorized.customer, validation.address, address.addAddress);
router.put('/update/:id', authorized.customer, validation.address, address.updateAddress);
router.delete('/delete/:id', address.deleteAddress);

module.exports = router;

