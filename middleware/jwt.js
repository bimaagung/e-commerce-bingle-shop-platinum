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
  try {
    
  if (authorization !== undefined && typeof authorization !== 'string') {
    return null;
  }

  let token = getToken(authorization);
  let payload = null;

  
    payload = jwt.verify(token, process.env.JWT_KEY_SECRET);
  

  if (payload.is_admin !== isAdmin) {
    return null;
  }

  const user = {
    id: payload.id,
    name: payload.name,
    username: payload.username,
    emai: payload.emai,
  };

  return user;

  } catch (err) {
    return null;
  }
};

const admin = (req, res, next) => {
  const { authorization } = req.headers;
  const isAdmin = true;
  const getAuthorization = authorized(authorization, isAdmin);

  if (getAuthorization === null) {
    return res.status(401).json(resData.failed('unauthorized'));
  }

  req.user = getAuthorization;

  next();
};

const customer = (req, res, next) => {
  const { authorization } = req.headers;
  const isAdmin = false;
  const getAuthorization = authorized(authorization, isAdmin);

  if (getAuthorization === null) {
    return res.status(401).json(resData.failed('unauthorized'));
  }

  req.user = getAuthorization;

  next();
};

module.exports = { customer, admin };