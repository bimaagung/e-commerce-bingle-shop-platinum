const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})
const orderSchemaReq = require('./docs/schema/request/order') 
const orderSchemaRes = require('./docs/schema/response/order') 
const productSchemaRes = require('./docs/schema/response/product')
const categorySchemaRes = require('./docs/schema/response/category')

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'apiteam@swagger.io',
    },
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
    }
  },
  definitions: {
    // create order
    bodyCreateOrder: orderSchemaReq.createOrder,
    successCreateOrder: orderSchemaRes.successCreateOrder,
    failCreateProductOrder: orderSchemaRes.checkProductOrder,
    failHaveOrderPending: orderSchemaRes.haveOrderPending,

    // get order pending
    successGetOrderPending : orderSchemaRes.successGetOrderPending,

    // submite order
    successSubmiteOrder : orderSchemaRes.successSubmiteOrder,
    checkProductOrderBeforeSumbit: orderSchemaRes.checkProductOrderBeforeSumbit,

    orderNotFound: orderSchemaRes.orderNotFound,

    unathorized: orderSchemaRes.unathorized,
    
    // product
    successGetAllProduct: productSchemaRes.successGetAllProduct,
    successGetProductById: productSchemaRes.successGetProductById,
    productNotFound : productSchemaRes.productNotFound,

    // category
    successGetAllCategory: categorySchemaRes.successGetAllCategory,
    successGetCategoryById: categorySchemaRes.successGetCategoryById,
    categoryNotFound: categorySchemaRes.categoryNotFound,
  },
}

const outputFile = './docs/docs.json'
const endpointsFiles = ['./routes/auth.js', './routes/public.js', './routes/customer.js']

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then((r) => {
  console.log(r)
})
