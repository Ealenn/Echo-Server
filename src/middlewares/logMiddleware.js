const bunyan = require('bunyan');
const seq = require('bunyan-seq');
const config = require('../nconf');

// Streams
let streams = [{
  stream: process.stdout,
  level: config.get('logs:level'),
}];

if (config.get('logs:seq:enabled')) {
  streams.push(seq.createStream({
    name: "seq",
    serverUrl: config.get('logs:seq:server'),
    level: config.get('logs:seq:level'),
    apiKey: config.get('logs:seq:key'),
  }));
}

// Logger
const log = bunyan.createLogger({
  name: config.get('logs:app'),
  streams
});

module.exports = (req, res, next) => {
  if (req.originalUrl != "/ping" || !config.get('logs:ignore:ping')) {
    switch (config.get('logs:format'))
    {
      case "line":
        log.info(`${new Date().toUTCString()} | [${req.method}] - ${req.protocol}://${req.get('host')}${req.originalUrl}`);
        break;
      case "object":
        log.info({
          host: require('../response/host')(req),
          http: require('../response/http')(req),
          request: require('../response/request')(req),
          environment: require('../response/environment')(req)
        });
        break;
      default:
        log.info({
          host: require('../response/host')(req),
          http: require('../response/http')(req),
          request: require('../response/request')(req),
          environment: require('../response/environment')(req)
        }, `${new Date().toUTCString()} | [${req.method}] - ${req.protocol}://${req.get('host')}${req.originalUrl}`);
        break;
    }
  }
  next();
}