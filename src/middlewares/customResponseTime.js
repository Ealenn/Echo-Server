const config = require('../nconf');

const timeToSleep = (value) => {
  if (value &&
    value <= config.get('controls:times:max') &&
    value >= config.get('controls:times:min')) {
      return value
  }
}

module.exports = (req, res, next) => {
  var time = timeToSleep(req.headers[config.get('commands:time:header')]) || timeToSleep(req.query[config.get('commands:time:query')]) || 1;
  setTimeout(() => {
    next();
  }, time);
}