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
  if (config.get('enable:file') && req.headers[config.get('commands:file:header')]) {
    returnFile(req.headers[config.get('commands:file:header')], res);
  } else if (config.get('enable:file') && req.query[config.get('commands:file:query')]) {
    returnFile(req.query[config.get('commands:file:query')], res);
  } else {
    next();
  }
}