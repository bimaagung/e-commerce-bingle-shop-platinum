const express = require('express')
const app = express()
const CategoryRepository = require('./repository/category')
const CategoryUseCase = require('./usecase/category')

const AddressRepository = require('./repository/address')
const AddressUseCase = require('./usecase/address')

const AdminRouter = require('./routes/admin')

const CategoryUC = new CategoryUseCase(new CategoryRepository())
const UserRepository = require('./repository/user')
const UserUseCase = require('./usecase/user')
const ProductUseCase = require('./usecase/product')
const ProductRepository = require('./repository/product')

const productRouter = require('./routes/product')
const authRouter = require('./routes/auth')
const addressRouter = require('./routes/address')

const productUC = new ProductUseCase(new ProductRepository()) //inisiasi module class product
const userUC = new UserUseCase(new UserRepository()) //inisiasi module class user
const addressUC = new AddressUseCase(new AddressRepository())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
  req.categoryUC = CategoryUC
  req.productUC = productUC
  req.userUC = userUC
  req.addressUC = addressUC
  next()
})

app.get('/', function (req, res) {
  // #swagger.ignore = true
  res.send('Hello Platinum Maju Jaya')
})

app.use('/admin', AdminRouter)

app.use('/product', productRouter)
app.use('/', authRouter)
app.use('/address',addressRouter )

const swaggerUi = require('swagger-ui-express') //import swagger
const swaggerDocument = require('./docs/docs.json')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app
