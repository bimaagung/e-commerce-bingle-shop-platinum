const express = require('express')
const productController = require('../controller/product')

const router = express.Router()


router.post('/product/add', productController.addProduct)
router.put('/product/update/:id', productController.updateProduct)
router.delete('/product/delete/:id', productController.deleteProduct)

module.exports = router
