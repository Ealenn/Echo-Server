const config = require('../nconf');

const setupHttpHeaders = (value, res) => {
  if (value) {
    var elements = value.split(', ');
    elements.forEach(customHeader => {
      var array = customHeader.split(':');
      // Using append for multiple headers with same key like set-cookie header
      // Adding trim to avoid spaces and make code resilient
      res.append(array[0].trim(), array.slice(1).join(':').trim());
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
