const config = require('../nconf');

module.exports = (req) => config.get('enable:host') ? {
    hostname: req.hostname,
    ip: req.ip,
    ips: req.ips,
} : undefined;