const express = require('express');
const categoryController = require('../controller/category');
const productController = require('../controller/product');
const imageController = require('../controller/image_product');
const orderController = require('../controller/order');
const authorized = require('../middleware/jwt');
const validation = require('../middleware/formValidation');
const handleUpload = require('../libs/handle_upload');

const router = express.Router();

// Category
router.post('/category/add', authorized.admin, validation.category, categoryController.addCategory);
router.put('/category/update/:id', authorized.admin, validation.category, categoryController.putCategory);
router.delete('/category/delete/:id', authorized.admin, categoryController.deleteCategory);

// Product
router.post('/product/add', authorized.admin, validation.product, productController.addProduct);
router.put('/product/update/:id', authorized.admin, validation.product, productController.updateProduct);
router.delete('/product/delete/:id', authorized.admin, productController.deleteProduct);

// Order
router.patch('/order/update-status/:id', authorized.admin, orderController.changeStatusOrder);
router.get('/order', authorized.admin, orderController.getListOrder);

// image product
router.post('/add-image/product',authorized.admin, handleUpload.upload.single('url'), imageController.addProductImage);
router.put('/update-image/product/:id', authorized.admin, handleUpload.upload.single('url'), imageController.updateImageProduct);
router.delete('/delete-image/product/:id', authorized.admin, imageController.deleteImageProduct);

// image prodcut customer
router.get('/image/product/:product_id', imageController.getImageProductByProductID)
module.exports = router;
