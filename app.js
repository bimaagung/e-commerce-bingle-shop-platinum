require("dotenv").config();

// const useAPM = process.env.USE_APM || false;
// const apm = require('elastic-apm-node').start({
//   serviceName: process.env.APP_NAME,
//   environment: 'development',
//   active: useAPM,
// });

const express = require("express");

const app = express();
const socketIO = require("socket.io");
const http = require("http");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express"); // import swagger

let logger = require("morgan");
const fs = require("fs");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const cloudinary = require("./libs/handle_upload");
const generateToken = require("./helper/jwt");
const googleOauth = require("./libs/google-auth");
const func = require("./libs/function");
const defaultImage = require("./internal/constant/defaultImage");
const email_message = require("./internal/constant/email_message");

const serverError = require("./middleware/serverError");

const CategoryRepository = require("./repository/category");
const CategoryUseCase = require("./usecase/category");

const AddressRepository = require("./repository/address");
const AddressUseCase = require("./usecase/address");

const ProductUseCase = require("./usecase/product");
const ProductRepository = require("./repository/product");

const OrderUseCase = require("./usecase/order");

const OrderRepository = require("./repository/order");
const OrderDetailRepository = require("./repository/orderDetail");

const UserRepository = require("./repository/user");
const UserUseCase = require("./usecase/user");

const AuthRepository = require("./repository/auth");
const AuthUseCase = require("./usecase/auth");

const ProductImageRepository = require("./repository/product_image");
const ProductImageUseCase = require("./usecase/product_image");

const EmailRepository = require("./repository/email");
const OtpRepository = require("./repository/otp");
const OtpUseCase = require("./usecase/otp");

const ChatRepository = require("./repository/chat");
const ChatUseCase = require("./usecase/chat");

const customerRouter = require("./routes/customer");
const publicRouter = require("./routes/public");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const otpRouter = require("./routes/otp");

const addressUC = new AddressUseCase(
  new AddressRepository(),
  new UserRepository()
);
const categoryUC = new CategoryUseCase(new CategoryRepository(), new ProductRepository());

const productUC = new ProductUseCase(
  new ProductRepository(),
  new CategoryRepository(),
  new ProductImageRepository(),
  defaultImage,
  _
);

const userUC = new UserUseCase(
  new UserRepository(),
  new OtpRepository(),
  bcrypt,
  cloudinary
);

const chatUC = new ChatUseCase(new ChatRepository(), new UserRepository(), _);

const authUC = new AuthUseCase(
  new AuthRepository(),
  new UserRepository(),
  new OtpRepository(),
  bcrypt,
  cloudinary,
  generateToken,
  _,
  googleOauth,
  func,
  defaultImage
);

const productImageUC = new ProductImageUseCase(
  new ProductImageRepository(),
  new ProductRepository(),
  cloudinary,
  _,
  defaultImage
);
const orderUC = new OrderUseCase(
  new OrderRepository(),
  new OrderDetailRepository(),
  new ProductRepository(),
  new CategoryRepository(),
  new EmailRepository(),
  new UserRepository(),
  _,
  new AddressRepository()
);

const otpUC = new OtpUseCase(
  new OtpRepository(),
  new EmailRepository(),
  email_message
);

// const ACCESS_LOG = process.env.ACCESS_LOG || './logs/access.log';
// const ERROR_LOG = process.env.ERROR_LOG || './logs/errors.log';

app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

// Logger

// logger.token('date', (req, res, tz) => moment().tz(tz).format());
// logger.format('custom_format', ':remote-addr - :remote-user [:date[Asia/Jakarta]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');

// app.use(logger('custom_format', {
//   stream: fs.createWriteStream(ACCESS_LOG, { flags: 'a' }),
// }));

// app.use(logger('custom_format', {
//   skip(req, res) { return res.statusCode < 400; },
//   stream: fs.createWriteStream(ERROR_LOG, { flags: 'a' }),
// }));

app.use((req, res, next) => {
  req.categoryUC = categoryUC;
  req.productUC = productUC;
  req.userUC = userUC;
  req.addressUC = addressUC;
  req.productImageUC = productImageUC;
  req.orderUC = orderUC;
  req.authUC = authUC;
  req.otpUC = otpUC;
  req.chatUC = chatUC;

  next();
});

app.get("/", (req, res) => {
  // #swagger.ignore = true
  res.send("Hello Platinum Maju Jaya");
});

app.use("/", authRouter);
app.use("/", adminRouter);
app.use("/", customerRouter);
app.use("/", publicRouter);
app.use("/", otpRouter);

// handle server error
app.use(serverError);

const swaggerDocument = require("./docs/docs.json");
const adminSwaggerDocument = require("./docs/admin_docs.json");

app.use(
  "/docs/admin",
  swaggerUi.serveFiles(adminSwaggerDocument),
  swaggerUi.setup(adminSwaggerDocument)
);
app.use(
  "/docs",
  swaggerUi.serveFiles(swaggerDocument),
  swaggerUi.setup(swaggerDocument)
);

const httpServer = http.createServer(app);

const authorizeWebSocket = require("./middleware/socket_io");

const io = socketIO(httpServer);

io.use(authorizeWebSocket);
io.on("connection", (socket) => {
  let userId = socket.handshake.auth.user.id;
  let room = `room_${userId}`;
  socket.join(room);

  socket.on("sendMessage", async (messageData) => {
    let recipient = messageData.recipient_id;
    messageData.sender_id = userId;

    let result = await chatUC.addChat(messageData);

    if (result !== null) {
      socket.emit("onNewMessage", messageData);
      socket.to(`room_${recipient}`).emit("onNewMessage", {
        ...result,
        is_sender: false,
      });
    }
  });

  socket.on("disconnected", () => {
    console.log("user is disconnected");
  });
});

module.exports = httpServer;
