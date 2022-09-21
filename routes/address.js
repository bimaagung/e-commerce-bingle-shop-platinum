const express = require('express');

const router = express.Router();
const address = require('../controller/address_controller');
const authorized = require('../middleware/jwt');
const validation = require('../middleware/formValidation');

router.get('/:id', authorized.customer, address.getAddressByID);
router.get('/', authorized.customer, address.getAllAddress);
router.post('/create', authorized.customer, validation.address, address.addAddress);
router.put('/update/:id', authorized.customer, validation.address, address.updateAddress);
router.delete('/delete/:id', authorized.customer, address.deleteAddress);

module.exports = router;

// api/address/create --> create = post
// api/address/update/:id --> edit = put
// api/address/delete/:id --> delete = delete
// api/address/:user_id
// api/address/:id
