<!---
exclude: true
nav_exclude: true
--->

## Tests

> ECHO_HOST = `localhost:3000` or `echoserver.cluster.local` for Kubernetes

```sh
$ curl -H 'Example: Value' -d foo=bar $ECHO_HOST/sub/route?query_arg=query_value | jq .request
{
  "params": {
    "0": "/sub/route"
  },
  "query": {
    "query_arg": "query_value"
  },
  "cookies": {},
  "body": {
    "foo": "bar"
  },
  "headers": {
    "host": "localhost:3000",
    "user-agent": "curl/7.64.1",
    "accept": "*/*",
    "example": "Value",
    "content-length": "7",
    "content-type": "application/x-www-form-urlencoded"
  }
}
```
