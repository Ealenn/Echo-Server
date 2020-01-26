const nconf = require('nconf');
const path = require('path');

module.exports = nconf
    .argv({
        parseValues: true
    })
    .env({
        separator: '__',
        lowerCase: true,
        parseValues: true,
    })
    .file({
        file: path.join(__dirname, 'global.json'),
    });