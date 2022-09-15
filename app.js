const express = require('express')
const app = express()
const CategoryRepository = require('./repository/category')
const CategoryUseCase = require('./usecase/category')

const AdminRouter = require('./routes/admin')

const CategoryUC = new CategoryUseCase(new CategoryRepository())
const UserRepository = require('./repository/user')
const UserUseCase = require('./usecase/user')
const ProductUseCase = require('./usecase/product')
const ProductRepository = require('./repository/product')

const productRouter = require('./routes/product')
const authRouter = require('./routes/auth')

const productUC = new ProductUseCase(new ProductRepository()) //inisiasi module class product
const userUC = new UserUseCase(new UserRepository()) //inisiasi module class user
app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
  req.categoryUC = CategoryUC
  req.productUC = productUC
  req.userUC = userUC
  next()
})

app.get('/', function (req, res) {
  // #swagger.ignore = true
  res.send('Hello Platinum Maju Jaya')
})

app.use('/admin', AdminRouter)

app.use('/product', productRouter)
app.use('/', authRouter)

const swaggerUi = require('swagger-ui-express') //import swagger
const swaggerDocument = require('./docs/docs.json')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app
