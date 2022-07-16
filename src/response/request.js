const config = require('../nconf');

module.exports = (req) => {
  if (config.get('enable:request')) {
    const isCookiesEnabled = config.get('enable:cookies');
    return {
      params: req.params,
      query: req.query,
      cookies: isCookiesEnabled ? req.cookies : [],
      body: req.body,
      headers: req.headers
    };
  } else {
    return undefined
  }
}
