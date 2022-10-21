const express = require('express');

const router = express.Router();

// controller
const categoryController = require('../controller/category');
const productController = require('../controller/product');
const imageController = require('../controller/image_product');

// product
router.get('/api/public/product', productController.getAllProducts);
router.get('/api/public/product/:id', productController.getProductById);

// category
router.get('/api/public/category', categoryController.getAllCategory);
router.get('/api/public/category/:id', categoryController.getCategoryByID);

// image prodcut customer
router.get('/api/public/image/product/:product_id', imageController.getImageProductByProductID);
router.get('/api/public/image/product/detail/:id', imageController.getImageProductByID);

module.exports = router;
