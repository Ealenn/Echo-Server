const config = require('../nconf');

const setupHttpHeaders = (value, res) => {
  if (value) {
    var elements = value.split(', ');
    elements.forEach(customHeader => {
      var array = customHeader.split(':');
      res.header(array[0], array.slice(1, array.length).join(':'));
    });
  }
}

module.exports = (req, res, next) => {
  if (config.get('enable:header')) { 
    try {
      setupHttpHeaders(req.headers[config.get('commands:httpHeaders:header')], res);
      setupHttpHeaders(req.query[config.get('commands:httpHeaders:query')], res);
    } finally {
      next();
    }
  } else {
    next();
  }
}