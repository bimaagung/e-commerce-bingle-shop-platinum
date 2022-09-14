const express = require('express')
const categoryController = require('../controller/category')

const router = express.Router()
router.get('/category', categoryController.getAllCategory)
router.get('/category/:id', categoryController.getCategoryById)
router.post('/category/add', categoryController.addCategory)
router.put('/category/update/:id', categoryController.putCategory)
router.delete('/category/delete/:id', categoryController.deleteCategory)

module.exports = router