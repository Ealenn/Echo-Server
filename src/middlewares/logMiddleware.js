const config = require('../nconf');
module.exports = (req, res, next) => {
  if (req.originalUrl != "/ping" || !config.get('logs:ignore:ping')) {
    console.log(`${new Date().toUTCString()} | [${req.method}] - ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  }
  next();
}