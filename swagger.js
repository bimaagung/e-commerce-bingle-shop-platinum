const options = {
    autoHeaders: false,
}

const swaggerAutogen = require('swagger-autogen')(options,{openapi: '3.0.0'})

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
    CreateOrder: {
      products: [
        {
          id: 1,
          qty: 2,
        }
      ]
    },
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
