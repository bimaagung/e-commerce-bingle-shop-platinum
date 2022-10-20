const express = require('express');

const router = express.Router();

// controller
const addressController = require('../controller/address');
const orderController = require('../controller/order');
const userController = require('../controller/user');
const chatController = require('../controller/chat');

const authorized = require('../middleware/jwt');
const validation = require('../middleware/formValidation');
const handleUpload = require('../libs/handle_upload');

// user
router.get('/api/customer/profil/user/', authorized.customer, userController.getOneUser);
router.patch('/api/customer/update-password/', authorized.customer, validation.updatePassword, userController.updatePassword);
router.put('/api/customer/update-image/', authorized.customer, handleUpload.upload.single('image'), userController.updateAvatar);
router.put('/api/customer/update/', authorized.customer, validation.updateUser, userController.updateUser);

// address
router.get('/api/customer/address/:id', authorized.customer, addressController.getAddressByID);
router.get('/api/customer/all/address/', authorized.customer, addressController.getAddresByUserID);
router.post('/api/customer/address/add', authorized.customer, validation.address, addressController.addAddress);
router.put('/api/customer/address/update/:id', authorized.customer, validation.address, addressController.updateAddress);
router.delete('/api/customer/address/delete/:id', authorized.customer, addressController.deleteAddress);

// order
router.post('/api/customer/order/add', authorized.customer, orderController.createOrder);
router.get('/api/customer/order/pending/', authorized.customer, orderController.getPendingOrderByUserId);
router.patch('/api/customer/order/submit/', authorized.customer, orderController.submitOrder);

// chat
router.get('/api/customer/chat', authorized.customer, chatController.getListChatByUserId);

module.exports = router;
