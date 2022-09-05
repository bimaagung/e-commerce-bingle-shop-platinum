const express = require('express')
const app = express()

const ProductRepository = require('./repository/product')
const ProductUseCase = require('./usecase/product')

const productRouter = require('./routes/product')

const productUC = new ProductUseCase(new ProductRepository())

app.use((req, res, next) => {
  req.productUC = productUC
  next()
})

app.get('/', function (req, res) {
  // #swagger.ignore = true
  res.send('Hello Platinum Maju Jaya')
})

app.use('/product', productRouter)

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/docs.json')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app
