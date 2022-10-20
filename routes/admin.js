const express = require('express');

// controller

const productController = require('../controller/product');
const categoryController = require('../controller/category');
const imageController = require('../controller/image_product');
const orderController = require('../controller/order');
const chatController = require('../controller/chat');

const authorized = require('../middleware/jwt');
const validation = require('../middleware/formValidation');
const handleUpload = require('../libs/handle_upload');

const router = express.Router();

// Category
router.post('/api/admin/category/add', authorized.admin, validation.category, categoryController.addCategory);
router.put('/api/admin/category/update/:id', authorized.admin, validation.category, categoryController.putCategory);
router.delete('/api/admin/category/delete/:id', authorized.admin, categoryController.deleteCategory);

// Product
router.post('/api/admin/product/add', authorized.admin, validation.product, productController.addProduct);
router.put('/api/admin/product/update/:id', authorized.admin, validation.product, productController.updateProduct);
router.delete('/api/admin/product/delete/:id', authorized.admin, productController.deleteProduct);

// Order
router.patch('/api/admin/order/update-status/:id', authorized.admin, orderController.changeStatusOrder);
router.get('/api/admin/order', authorized.admin, orderController.getListOrder);
router.get('/api/admin/order/:id', authorized.admin, orderController.getOrderById);

// image product
router.post('/api/admin/add-image/product', authorized.admin, handleUpload.upload.single('url'), imageController.addProductImage);
router.put('/api/admin/update-image/product/:id', authorized.admin, handleUpload.upload.single('url'), imageController.updateImageProduct);
router.delete('/api/admin/delete-image/product/:id', authorized.admin, imageController.deleteImageProduct);

// chat
router.get('/api/admin/chat/', authorized.admin, chatController.getListChatByUserId);

module.exports = router;
