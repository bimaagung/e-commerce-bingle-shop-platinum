const express = require('express')
const categoryController = require('../controller/category')
const productController = require('../controller/product')
const router = express.Router()

// Category
router.get('/category', categoryController.getAllCategory)
router.get('/category/:id', categoryController.getCategoryById)
router.post('/category/add', categoryController.addCategory)
router.put('/category/update/:id', categoryController.putCategory)
router.delete('/category/delete/:id', categoryController.deleteCategory)

// Product
router.post('/product/add', productController.addProduct)
router.put('/product/update/:id', productController.updateProduct)
router.delete('/product/delete/:id', productController.deleteProduct)

module.exports = router
