const config = require('../nconf');

const setupHttpHeaders = (value, res) => {
  if (value) {
    // Split by ";" instead of "," to allow commas inside header values
    // Adding trim to avoid spaces and make code resilient
    const elements = value.split(';');
    elements.forEach(customHeader => {
      // Skip empty headers
      if (!customHeader.trim()) return; 

      const array = customHeader.split(':');
      const key = array[0].trim();
      const val = array.slice(1).join(':').trim();

      if (key) {
        // append preserves duplicates (e.g. multiple Set-Cookie headers)
        res.append(key, val); 
      }
    });
  }
};

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
};
