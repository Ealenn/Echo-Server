const returnBody = (value, res) => {
  try {
    res.json(JSON.parse(value));
  } catch (e) {
    res.json(value);
  }
}

module.exports = (req, res, next) => {
  if (req.headers.echo_body) {
    returnBody(req.headers.echo_body, res);
  } else if (req.query.echo_body) {
    returnBody(req.query.echo_body, res);
  } else {
    next();
  }
}