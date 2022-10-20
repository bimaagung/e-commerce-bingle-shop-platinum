const jwt = require('jsonwebtoken');

const failedMsg = 'socket authorization failed'

function getToken(authHeader) {
    let splitHeader = authHeader.split(' ');
  
    if (splitHeader.length > 1) {
      return splitHeader[1];
    }
  
    return splitHeader[0];
  }

function authorize( socket, next) {
    let authHeader = socket.handshake.headers['authorization']
    if(typeof authHeader !== "string") {
        return next(new Error(failedMsg))
    }    
    let token = getToken(authHeader)
    let payload = null;

    payload = jwt.verify(token, process.env.JWT_KEY_SECRET);

    if (payload.is_admin !== isAdmin) {
      return next(new Error(failedMsg));
    }
    let auth = {
        user: payload.user,
        is_admin: payload.is_admin
    }
    socket.handshake.auth = auth
    next()
}   
    
module.exports = authorize
  

  
