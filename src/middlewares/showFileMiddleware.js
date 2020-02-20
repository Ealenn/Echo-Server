const config = require('../nconf');
const fs = require('fs');

const returnFile = (path, res) => {
  try{
    if (fs.lstatSync(path).isDirectory()){
      res.json(
        fs.readdirSync(path)
      );
    } else {
      res.status(200).send(
        fs.readFileSync(path, "utf8")
      );
    }
  } catch (ex) {
    res.status(404).send({
      error: "File or Directory not found"
    });
  }
}

module.exports = (req, res, next) => {
  if (config.get('enable:file') && req.headers.echo_file) {
    returnFile(req.headers.echo_file, res);
  } else if (config.get('enable:file') && req.query.echo_file) {
    returnFile(req.query.echo_file, res);
  } else {
    next();
  }
}