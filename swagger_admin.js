const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const orderSchemaReq = require('./docs/schema/request/order');
const productSchemaReq = require('./docs/schema/request/product');
const categorySchemaReq = require('./docs/schema/request/category');

const orderSchemaRes = require('./docs/schema/response/order');
const productSchemaRes = require('./docs/schema/response/product');
const categorySchemaRes = require('./docs/schema/response/category');

const doc = {
  info: {
    title: 'Admin - API E-commerce Platinum Maju Jaya',
    description: 'API ecommerce App for project platinum for admin, create by Maju Jaya',
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
      bearerFormat: 'JWT',
    },
  },
  definitions: {
    // order
    bodyCreateOrder: orderSchemaReq.createOrder,
    bodyUpdateStatusOrder: orderSchemaReq.updateStatusOrder,
    queryStatus: orderSchemaReq.queryStatus,
    successCreateOrder: orderSchemaRes.successCreateOrder,
    successGetListOrder: orderSchemaRes.successGetListOrder,
    failCreateProductOrder: orderSchemaRes.checkProductOrder,
    failHaveOrderPending: orderSchemaRes.haveOrderPending,
    successGetOrderPending: orderSchemaRes.successGetOrderPending,
    successOrder: orderSchemaRes.successOrder,
    checkProductOrderBeforeSumbit: orderSchemaRes.checkProductOrderBeforeSumbit,
    orderNotFound: orderSchemaRes.orderNotFound,
    outsideOptionStatus: orderSchemaRes.outsideOptionStatus,

    // product
    bodyAddProduct: productSchemaReq.addProduct,
    bodyUpdateProduct: productSchemaReq.updateProduct,
    successGetAllProduct: productSchemaRes.successGetAllProduct,
    successGetProductById: productSchemaRes.successGetProductById,
    successAddProduct: productSchemaRes.successAddProduct,
    successProduct: productSchemaRes.successProduct,
    productNotFound: productSchemaRes.productNotFound,
    categoryProductNotFound: productSchemaRes.categoryProductNotFound,
    imageProductNotFound: productSchemaRes.imageProductNotFound,

    // category
    bodyAddCategory: categorySchemaReq.addCategory,
    bodyUpdateCategory: categorySchemaReq.updateCategory,
    successGetAllCategory: categorySchemaRes.successGetAllCategory,
    successGetCategoryById: categorySchemaRes.successGetCategoryById,
    categoryNotFound: categorySchemaRes.categoryNotFound,
    successCategory: categorySchemaRes.successCategory,

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
