const config = require('../nconf');

module.exports = (req) => config.get('enable:http') ? {
    method: req.method,
    baseUrl: req.baseUrl,
    originalUrl: req.originalUrl,
    protocol: req.protocol,
} : undefined;