const app = require('./app');
const config = require('./nconf');
app.listen(config.get('port'), () => console.debug(`Listening on port ${config.get('port')}.`));
