const config = require('../nconf');

module.exports = (req) => config.get('enable:request') ? {
    params: req.params,
    query: req.query,
    cookies: req.cookies,
    body: req.body,
    headers: req.headers
} : undefined;