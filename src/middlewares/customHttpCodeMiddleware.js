const config = require('../nconf');
const isNormalInteger = (str) => /^\+?(0|[1-9]\d*)$/.test(str);

const setupHttpCode = (value, res) => {
  if (value){
    var values = value.split("-");
    var validValues = [];
    values.forEach(element => {
      if (element &&
        isNormalInteger(element) &&
        element >= 200 &&
        element <= 599) {
          validValues.push(element);
      }
    });

    if (validValues.length > 0){
      res.status(validValues[Math.floor(Math.random() * validValues.length)]);
    }

    if (config.get('commands:httpCode:headerResponse')){
      res.header('X-ECHO-RANDOM-STATUS', validValues);
    }
  }
}

module.exports = (req, res, next) => {
  try {
    setupHttpCode(req.headers[config.get('commands:httpCode:header')], res);
    setupHttpCode(req.query[config.get('commands:httpCode:query')], res);
  } finally {
    next();
  }
}