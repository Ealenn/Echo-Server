const timeToSleep = (value) => {
  if (value &&
    value <= 30000 &&
    value >= 0) {
      return value
  }
}

module.exports = (req, res, next) => {
  var time = timeToSleep(req.headers.echo_time) || timeToSleep(req.query.echo_time) || 1;
  setTimeout(() => {
    next();
  }, time);
}