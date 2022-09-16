const express = require('express');
const router = express.Router();
const address = require('../controller/address_controller');

router.get('/:id', address.getAddressByID);
router.get('/', address.getAllAddress);
router.post('/create', address.addAddress);
// router.put('/update/:id', address.editAddress);
// router.delete('/delete/:id', address.deleteAddress);


module.exports = router;



// router.get('/category', categoryController.getAllCategory)
// router.get('/category/:id', categoryController.getCategoryById)
// router.post('/category/add', categoryController.addCategory)
// router.put('/category/update/:id', categoryController.putCategory)
// router.delete('/category/delete/:id', categoryController.deleteCategory)

// api/address/create --> create = post
// api/address/update/:id --> edit = put
// api/address/delete/:id --> delete = delete
// api/address/:user_id
// api/address/:id