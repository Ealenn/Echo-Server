const config = require('../nconf');

module.exports = (req, res, next) => {
  if (!config.get('enable:environment')) {
    next();
  } else if (req.headers[config.get('commands:httpEnvBody:header')]) {
    res.json(process.env[req.headers[config.get('commands:httpEnvBody:header')]]);
  } else if (req.query[config.get('commands:httpEnvBody:query')]) {
    res.json(process.env[req.query[config.get('commands:httpEnvBody:query')]]);
  } else {
    next();
  }
}