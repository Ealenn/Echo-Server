const express = require('express')
const app = express()
const port = process.env.PORT || 3000

function response(req) {
    console.log(`${Date.now()} | [${req.method}] - ${req.protocol}://${req.get('host')}${req.originalUrl}`);
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

app.all('*', (req, res) => res.json(response(req)));
app.listen(port, () => console.log(`Listening on port ${port}.`));