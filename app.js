require('dotenv').config();

// const useAPM = process.env.USE_APM || false;
// const apm = require('elastic-apm-node').start({
//   serviceName: process.env.APP_NAME,
//   environment: 'development',
//   active: useAPM,
// });

const express = require('express');

const app = express();
const swaggerUi = require('swagger-ui-express'); // import swagger
let logger = require('morgan');
const fs = require('fs');
const moment = require('moment-timezone');

const serverError = require('./middleware/serverError');

const CategoryRepository = require('./repository/category');
const CategoryUseCase = require('./usecase/category');

const AddressRepository = require('./repository/address');
const AddressUseCase = require('./usecase/address');

const ProductUseCase = require('./usecase/product');
const ProductRepository = require('./repository/product');

const OrderUseCase = require('./usecase/order');

const OrderRepository = require('./repository/order');
const OrderDetailRepository = require('./repository/orderDetail');

const UserRepository = require('./repository/user');
const UserUseCase = require('./usecase/user');

const AuthRepository = require('./repository/auth');
const AuthUseCase = require('./usecase/auth');

const ProductImageRepository = require('./repository/product_image');
const ProductImageUseCase = require('./usecase/product_image');

const customerRouter = require('./routes/customer');
const publicRouter = require('./routes/public');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

const addressUC = new AddressUseCase(new AddressRepository(), new UserRepository());
const categoryUC = new CategoryUseCase(new CategoryRepository());
const productUC = new ProductUseCase(new ProductRepository(), new CategoryRepository());
const userUC = new UserUseCase(new UserRepository());

const authUC = new AuthUseCase(
  new AuthRepository(),
  new UserRepository(),
);

const productImageUC = new ProductImageUseCase(
  new ProductImageRepository(),
  new ProductRepository(),
);
const orderUC = new OrderUseCase(
  new OrderRepository(),
  new OrderDetailRepository(),
  new ProductRepository(),
  new CategoryRepository(),
);

const ACCESS_LOG = process.env.ACCESS_LOG || './logs/access.log';
const ERROR_LOG = process.env.ERROR_LOG || './logs/errors.log';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

// Logger

logger.token('date', (req, res, tz) => moment().tz(tz).format());
logger.format('custom_format', ':remote-addr - :remote-user [:date[Asia/Jakarta]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');

app.use(logger('custom_format', {
  stream: fs.createWriteStream(ACCESS_LOG, { flags: 'a' }),
}));

app.use(logger('custom_format', {
  skip(req, res) { return res.statusCode < 400; },
  stream: fs.createWriteStream(ERROR_LOG, { flags: 'a' }),
}));

app.use((req, res, next) => {
  req.categoryUC = categoryUC;
  req.productUC = productUC;
  req.userUC = userUC;
  req.addressUC = addressUC;
  req.productImageUC = productImageUC;
  req.orderUC = orderUC;
  req.authUC = authUC;
  next();
});

app.get('/', (req, res) => {
  // #swagger.ignore = true
  res.send('Hello Platinum Maju Jaya');
});

app.use('/', authRouter);
app.use('/', adminRouter);
app.use('/', customerRouter);
app.use('/', publicRouter);

// handle server error
app.use(serverError);

const swaggerDocument = require('./docs/docs.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
