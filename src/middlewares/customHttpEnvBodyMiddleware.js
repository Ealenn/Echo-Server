const config = require('../nconf');

module.exports = (req, res, next) => {
  if (!config.get('enable:environment')) {
    next();
  } else if (req.headers.echo_env_body) {
    res.json(process.env[req.headers.echo_env_body]);
  } else if (req.query.echo_env_body) {
    res.json(process.env[req.query.echo_env_body]);
  } else {
    next();
  }
}