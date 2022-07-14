const config = require('../nconf');

module.exports = (req) => {
  if (config.get('enable:request')) {
      if (config.get('enable:cookies')) {
          return {
              params: req.params,
              query: req.query,
              cookies: req.cookies,
              body: req.body,
              headers: req.headers
          }
      } else {
          return {
              params: req.params,
              query: req.query,
              body: req.body,
              headers: req.headers
          }
      }
  } else {
      return undefined
  }
}
