const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const orderSchemaReq = require('./docs/schema/request/order');
const addressSchemaReq = require('./docs/schema/request/address');
const userSchemaReq = require('./docs/schema/request/user');
const authSchemaReq = require('./docs/schema/request/auth');
const productSchemaReq = require('./docs/schema/request/product');

const orderSchemaRes = require('./docs/schema/response/order');
const productSchemaRes = require('./docs/schema/response/product');
const categorySchemaRes = require('./docs/schema/response/category');
const addressSchemaRes = require('./docs/schema/response/address');
const userSchemaRes = require('./docs/schema/response/user');
const authSchemaRes = require('./docs/schema/response/auth');

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
      bearerFormat: 'JWT',
    },
  },
  definitions: {
    // product
    bodyAddProduct: productSchemaReq.addProduct,
    bodyUpdateProduct: productSchemaReq.updateProduct,
    successGetAllProduct: productSchemaRes.successGetAllProduct,
    successGetProductById: productSchemaRes.successGetProductById,
    successAddProduct: productSchemaRes.successAddProduct,
    successProduct: productSchemaRes.successProduct,
    productNotFound: productSchemaRes.productNotFound,
    categoryProductNotFound: productSchemaRes.categoryProductNotFound,

    // category
    successGetAllCategory: categorySchemaRes.successGetAllCategory,
    successGetCategoryById: categorySchemaRes.successGetCategoryById,
    categoryNotFound: categorySchemaRes.categoryNotFound,

    // auth
    unathorized: orderSchemaRes.unathorized,
  },
};

const outputFile = './docs/admin_docs.json';
const endpointsFiles = ['./routes/auth.js', './routes/public.js', './routes/admin.js'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then((r) => {
  console.log(r);
});
