const express = require('express')();
const config = require('./nconf');

function response(req) {
    if (req.originalUrl != "/ping" || (req.originalUrl == "/ping" && !config.get('logs:ignore:ping'))) {
        console.log(`${Date.now()} | [${req.method}] - ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    }

    return {
        request: {
            method: req.method,
            baseUrl: req.baseUrl,
            originalUrl: req.originalUrl,
            protocol: req.protocol,
            params: req.params,
            query: req.query,
            cookies: req.cookies,
            hostname: req.hostname,
            ip: req.ip,
            ips: req.ips,
            body: req.body,
            headers: req.headers
        },
        env: process.env
    }
};

express.all('*', (req, res) => res.json(response(req)));
express.listen(config.get('port'), () => console.log(`Listening on port ${config.get('port')}.`));