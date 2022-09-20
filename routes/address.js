const express = require('express');

const router = express.Router();
const address = require('../controller/address_controller');
const authorized = require('../middleware/jwt');

router.get('/:id', authorized.customer, address.getAddressByID);
router.get('/', authorized.customer, address.getAllAddress);
router.post('/create', authorized.customer, address.addAddress);
router.put('/update/:id', authorized.customer, address.updateAddress);
router.delete('/delete/:id', authorized.customer, address.deleteAddress);

module.exports = router;

// api/address/create --> create = post
// api/address/update/:id --> edit = put
// api/address/delete/:id --> delete = delete
// api/address/:user_id
// api/address/:id
