const app = require('./app');
const config = require('./nconf');
app.listen(config.get('port'), () => console.log(`Listening on port ${config.get('port')}.`));
