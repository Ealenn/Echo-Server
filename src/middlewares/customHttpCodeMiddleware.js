const config = require('../nconf');

const setupHttpCode = (value, res) => {
  if (value &&
    value >= 200 &&
    value <= 599) {
    res.status(value);
  }
}

module.exports = (req, res, next) => {
  setupHttpCode(req.headers[config.get('commands:httpCode:header')], res);
  setupHttpCode(req.query[config.get('commands:httpCode:query')], res);
  next();
}