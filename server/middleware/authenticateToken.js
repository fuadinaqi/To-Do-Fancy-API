const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next) {
  if (req.headers.token) {
    jwt.verify(req.headers.token, 'FUADIGANTENG', (err, decoded) => {
      req.headers.decoded = decoded
      next()
    })
  }
}
