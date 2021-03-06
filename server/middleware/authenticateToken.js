const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function authenticateToken(req, res, next) {
  if (req.headers.token) {
    jwt.verify(req.headers.token, 'FUADIGANTENG', (err, decoded) => {
      req.headers.decoded = decoded
      next()
    })
  }
}
