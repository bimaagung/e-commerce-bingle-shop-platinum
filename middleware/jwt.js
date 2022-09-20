const jwt = require('jsonwebtoken');
const resData = require('../helper/response');

function getToken(authHeader) {
  let splitHeader = authHeader.split(' ');

  if (splitHeader.length > 1) {
    return splitHeader[1];
  }

  return splitHeader[0];
}

const authorized = (authorization, isAdmin) => {
  if (authorization !== undefined && typeof authorization !== 'string') {
    return null;
  }

  let token = getToken(authorization);
  let payload = null;

  try {
    payload = jwt.verify(token, process.env.JWT_KEY_SECRET);
  } catch (err) {
    return null;
  }

  if (payload.is_admin === isAdmin) {
    return null;
  }

  const user = {
    id: payload.id,
    name: payload.name,
    username: payload.username,
    emai: payload.emai,
  };

  return user;
};

const authorizedAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  const admin = true;
  const getAuthorization = authorized(authorization, admin);

  if (getAuthorization === null) {
    return res.status(401).json(resData.failed('unauthorized'));
  }

  req.user = getAuthorization;

  next();
};

const authorizedCustomer = (req, res, next) => {
  const { authorization } = req.headers;
  const admin = false;
  const getAuthorization = authorized(authorization, admin);

  if (getAuthorization === null) {
    return res.status(401).json(resData.failed('unauthorized'));
  }

  req.user = getAuthorization;

  next();
};

module.exports = { authorizedCustomer, authorizedAdmin };
