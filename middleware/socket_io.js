const jwt = require('jsonwebtoken');

const FAILED_MESSAGE = 'socket authorization failed';

function getToken(authHeader) {
  let splitHeader = authHeader.split(' ');

  if (splitHeader.length > 1) {
    return splitHeader[1];
  }

  return splitHeader[0];
}

function authorize(socket, next) {
  let authHeader = socket.handshake.headers.authorization;
  if (typeof authHeader !== 'string') {
    return next(new Error(FAILED_MESSAGE));
  }

  let token = getToken(authHeader);
  let payload = null;

  try {
    payload = jwt.verify(token, process.env.JWT_KEY_SECRET);
  } catch (error) {
    return next(new Error(FAILED_MESSAGE));
  }

  let auth = {
    user: payload,
    is_admin: payload.is_admin,
  };
  socket.handshake.auth = auth;
  next();
}

module.exports = authorize;
