const jwt = require('jsonwebtoken');

const failedMsg = 'socket authorization failed'

function getToken(authHeader) {
    let splitHeader = authHeader.split(' ');
  
    if (splitHeader.length > 1) {
      return splitHeader[1];
    }
  
    return splitHeader[0];
  }
  
  

  
