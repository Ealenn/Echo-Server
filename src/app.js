const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer  = require('multer')();
const config = require('./nconf');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(multer.array()); 

function response(req) {
    if (req.originalUrl != "/ping" || !config.get('logs:ignore:ping')) {
        console.log(`${Date.now()} | [${req.method}] - ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    }

    return {
        host: config.get('enable:host') ? {
            hostname: req.hostname,
            ip: req.ip,
            ips: req.ips,
        } : undefined,
        http: config.get('enable:http') ? {
            method: req.method,
            baseUrl: req.baseUrl,
            originalUrl: req.originalUrl,
            protocol: req.protocol,
        } : undefined,
        request: config.get('enable:request') ? {
            params: req.params,
            query: req.query,
            cookies: req.cookies,
            body: req.body,
            headers: req.headers
        } : undefined,
        environment: config.get('enable:environment') ? process.env : undefined
    }
};

app.all('*', (req, res) => res.json(response(req)));
app.listen(config.get('port'), () => console.log(`Listening on port ${config.get('port')}.`));