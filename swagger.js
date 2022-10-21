const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})

const orderSchemaReq = require('./docs/schema/request/order') 
const addressSchemaReq = require('./docs/schema/request/address')
const userSchemaReq = require('./docs/schema/request/user')
const authSchemaReq = require('./docs/schema/request/auth')
const oauthSchemaReq = require('./docs/schema/request/oaut')

const orderSchemaRes = require('./docs/schema/response/order') 
const productSchemaRes = require('./docs/schema/response/product')
const categorySchemaRes = require('./docs/schema/response/category')
const addressSchemaRes = require('./docs/schema/response/address')
const userSchemaRes = require('./docs/schema/response/user')
const authSchemaRes = require('./docs/schema/response/auth')

const doc = {
  info: {
    title: 'Customer - API E-commerce Platinum Maju Jaya',
    description: 'API ecommerce App for project platinum for customer, create by Maju Jaya',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'platinum.majujaya@gmail.com',
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
    // order
    bodyCreateOrder: orderSchemaReq.createOrder,
    successCreateOrder: orderSchemaRes.successCreateOrder,
    failCreateProductOrder: orderSchemaRes.checkProductOrder,
    failHaveOrderPending: orderSchemaRes.haveOrderPending,
    successGetOrderPending : orderSchemaRes.successGetOrderPending,
    successOrder : orderSchemaRes.successOrder,
    checkProductOrderBeforeSumbit: orderSchemaRes.checkProductOrderBeforeSumbit,
    orderNotFound: orderSchemaRes.orderNotFound,
    
    // product
    successGetAllProduct: productSchemaRes.successGetAllProduct,
    successGetProductById: productSchemaRes.successGetProductById,
    productNotFound : productSchemaRes.productNotFound,
    addImageProduct: productSchemaRes.addImageProduct,
    addImageNotFound: productSchemaRes.addImageNotFound,

    // category
    successGetAllCategory: categorySchemaRes.successGetAllCategory,
    successGetCategoryById: categorySchemaRes.successGetCategoryById,
    categoryNotFound: categorySchemaRes.categoryNotFound,

    // address
    bodyAddAddress: addressSchemaReq.addAddress,
    bodyUpdateAddress: addressSchemaReq.updateAddress,
    successAddAddress: addressSchemaRes.successAddAddress,
    successGetAllAdressByUserId: addressSchemaRes.successGetAllAdressByUserId,
    sucessAddress: addressSchemaRes.sucessAddress,
    addressNotFound: addressSchemaRes.addressNotFound,

    // user
    bodyUpdateUser: userSchemaReq.updateUser,
    bodyUpdatePassword: userSchemaReq.updatePassword,
    successUser: userSchemaRes.successUser,
    successGetUserById: userSchemaRes.successGetUserById,
    notMatchPassword: userSchemaRes.notMatchPassword,
    userNotFound : userSchemaRes.userNotFound,

    // auth
    bodyRegister : authSchemaReq.register,
    successRegister: authSchemaRes.successRegister,
    notAvailable: authSchemaRes.notAvailable,
    passwordNotMatch: authSchemaRes.passwordNotMatch,
    unathorized: orderSchemaRes.unathorized,

    // oaut
    bodyLoginGoogle : oauthSchemaReq.loginGoogle

  },
}

const outputFile = './docs/docs.json'
const endpointsFiles = ['./routes/auth.js', './routes/public.js', './routes/customer.js', './routes/otp.js']

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then((r) => {
  console.log(r)
})
