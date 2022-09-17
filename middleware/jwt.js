const jwt = require('jsonwebtoken')
const resData = require('../helper/response')

function getToken(auth_header) {
  let splitHeader = auth_header.split(' ')

  if (splitHeader.length > 1) {
    return splitHeader[1]
  }

  return splitHeader[0]
}

function authorize(req, res, next) {
  if (typeof req.headers['authorization'] !== 'string') {
    return res.status(401).json(resData.failed('unauthorized'))
  }
  let token = getToken(req.headers['authorization'])
  let payload = null

  try {
    payload = jwt.verify(token, process.env.JWT_KEY_SECRET)
  } catch (err) {
    return res.status(401).json(resData.failed('unauthorized'))
  }

  req.user = {
    id: payload.id,
    name: payload.name,
    emai: payload.emai,
  }

  next()
}

module.exports = authorize
