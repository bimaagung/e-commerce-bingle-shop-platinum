const express = require('express')
const app = express()

const CategoryRepository = require('./repository/category')
const CategoryUseCase = require('./usecase/category')

const AdminRouter = require('./routes/admin')

const CategoryUC = new CategoryUseCase(new CategoryRepository())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
  req.categoryUC = CategoryUC
  next()
})

app.get('/', function (req, res) {
  // #swagger.ignore = true
  res.send('Hello Platinum Maju Jaya')
})

app.use('/admin', AdminRouter)


const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/docs.json')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app
