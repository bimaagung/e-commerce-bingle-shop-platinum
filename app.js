const express = require('express')
const app = express()

const UserRepository = require('./repository/user')
const UserUseCase = require('./usecase/user')
const ProductUseCase = require('./usecase/product')
const ProductRepository = require('./repository/product')

const productRouter = require('./routes/product')
const authRouter = require('./routes/auth')

const productUC = new ProductUseCase(new ProductRepository()) //inisiasi module class product
const userUC = new UserUseCase(new UserRepository()) //inisiasi module class user

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
  req.productUC = productUC
  req.userUC = userUC
  next()
})

app.get('/', function (req, res) {
  // #swagger.ignore = true
  res.send('Hello Platinum Maju Jaya')
})


app.use('/product', productRouter)
app.use('/', authRouter)

const swaggerUi = require('swagger-ui-express') //import swagger
const swaggerDocument = require('./docs/docs.json')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app
