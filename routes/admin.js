const express = require('express');
const categoryController = require('../controller/category');
const productController = require('../controller/product');
const orderController = require('../controller/order');
const authorized = require('../middleware/jwt');

const router = express.Router();
const handleUpload = require('../libs/handle_upload');

// Category
router.get('/category', categoryController.getAllCategory);
router.get('/category/:id', categoryController.getCategoryById);
router.post('/category/add', categoryController.addCategory);
router.put('/category/update/:id', categoryController.putCategory);
router.delete('/category/delete/:id', categoryController.deleteCategory);

// Product
router.post('/product/add', handleUpload.upload.single('image'), productController.createProudct);
router.put('/product/update/:id', handleUpload.upload.single('image'), productController.updateProduct);
router.delete('/product/delete/:id', productController.deleteProduct);

// Order
router.patch('/order/update-status/:id', authorized.admin, orderController.changeStatusOrder);

module.exports = router;
