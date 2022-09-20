const express = require('express')
const productController = require('../controller/product')

const router = express.Router()
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductById)

module.exports = router