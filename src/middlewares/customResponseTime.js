const config = require('../nconf');

const timeToSleep = (value) => {
  if (value &&
    value <= 30000 &&
    value >= 0) {
      return value
  }
}

module.exports = (req, res, next) => {
  var time = timeToSleep(req.headers[config.get('commands:time:header')]) || timeToSleep(req.query[config.get('commands:time:query')]) || 1;
  setTimeout(() => {
    next();
  }, time);
}