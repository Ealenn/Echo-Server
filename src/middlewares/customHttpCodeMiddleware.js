const setupHttpCode = (value, res) => {
  if (value &&
    value >= 200 &&
    value <= 599) {
    res.status(value);
  }
}

module.exports = (req, res, next) => {
  setupHttpCode(req.headers.echo_code, res);
  setupHttpCode(req.query.echo_code, res);
  next();
}