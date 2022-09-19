const express = require('express')
const app = express()

const serverError = require('./middleware/serverError')

const CategoryRepository = require('./repository/category')
const CategoryUseCase = require('./usecase/category')



const categoryUC = new CategoryUseCase(new CategoryRepository())

const UserRepository = require('./repository/user')
const UserUseCase = require('./usecase/user')

const ProductUseCase = require('./usecase/product')
const ProductRepository = require('./repository/product')

const OrderUseCase = require('./usecase/order')

const OrderRepository = require('./repository/order')
const OrderDetailRepository = require('./repository/orderDetail')

const productRouter = require('./routes/product')
const authRouter = require('./routes/auth')
const AdminRouter = require('./routes/admin')
const orderRouter = require('./routes/order')



app.use('/public', express.static('public'))

const CategoryUC = new CategoryUseCase(new CategoryRepository())
const productUC = new ProductUseCase(new ProductRepository())
const userUC = new UserUseCase(new UserRepository())
const orderUC = new OrderUseCase(
  new OrderRepository(),
  new OrderDetailRepository(),
  new ProductRepository(),



app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
  req.categoryUC = categoryUC
  req.productUC = productUC
  req.userUC = userUC
  req.orderUC = orderUC
  next()
})

app.get('/', function (req, res) {
  // #swagger.ignore = true
  res.send('Hello Platinum Maju Jaya')
})

app.use('/', authRouter)
app.use('/admin', AdminRouter)
app.use('/product', productRouter)
app.use('/order', orderRouter)

// handle server error
app.use(serverError)

const swaggerUi = require('swagger-ui-express') //import swagger
const swaggerDocument = require('./docs/docs.json')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app
