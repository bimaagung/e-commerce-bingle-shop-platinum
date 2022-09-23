const express = require('express');
const categoryController = require('../controller/category');
const productController = require('../controller/product');
const orderController = require('../controller/order');
const authorized = require('../middleware/jwt');
const validation = require('../middleware/formValidation');

const router = express.Router();
const handleUpload = require('../libs/handle_upload');

// Category
router.post('/category/add', authorized.admin, validation.category, categoryController.addCategory);
router.put('/category/update/:id', authorized.admin, validation.category, categoryController.putCategory);
router.delete('/category/delete/:id', authorized.admin, categoryController.deleteCategory);

// Product
router.post('/product/add', authorized.admin, validation.product, handleUpload.upload.single('image'), productController.createProudct);
router.put('/product/update/:id', authorized.admin, validation.product, handleUpload.upload.single('image'), productController.updateProduct);
router.delete('/product/delete/:id', authorized.admin, productController.deleteProduct);

// Order
router.patch('/order/update-status/:id', authorized.admin, orderController.changeStatusOrder);

// User 
router.get('/user/:id', authorized.admin, userController.updateUser);

module.exports = router;
