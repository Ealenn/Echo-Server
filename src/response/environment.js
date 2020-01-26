const config = require('../nconf');

module.exports = (req) => config.get('enable:environment') ? process.env : undefined;