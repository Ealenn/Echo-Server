const config = require('../nconf');

const returnBody = (value, res) => {
  try {
    res.json(JSON.parse(value));
  } catch (e) {
    res.json(value);
  }
}

module.exports = (req, res, next) => {
  if (req.headers[config.get('commands:httpBody:header')]) {
    returnBody(req.headers[config.get('commands:httpBody:header')], res);
  } else if (req.query[config.get('commands:httpBody:query')]) {
    returnBody(req.query[config.get('commands:httpBody:query')], res);
  } else {
    next();
  }
}