<!---
exclude: true
nav_exclude: true
--->

## Use Echo-Server

- ECHO_HOST = `localhost:3000` or `echoserver.cluster.local` for Kubernetes by default.

I use [jq](https://stedolan.github.io/jq) for nice `curl` results ;)

![curl](https://ealenn.github.io/Echo-Server/assets/images/curl.png)

### Custom responses

| Query               | Header                | Content                          | Conditions                |
|---------------------|-----------------------|----------------------------------| ------------------------- |
| ?echo_code=         | X-ECHO-CODE           | HTTP code `200`, `404`           | 200 <= `CODE` <= 599      |
|                     |                       | `404-401` or `200-500-301`       |                           |
| ?echo_body=         | X-ECHO-BODY           | Body message                     |                           |
| ?echo_env_body=     | X-ECHO-ENV-BODY       | The key of environment variable  | Enable environment `true` |
| ?echo_header=       | X-ECHO-HEADER         | Response Header `Lang: en-US`    | Enable header `true`      |
| ?echo_time=         | X-ECHO-TIME           | Wait time in `ms`                | 0 <= `TIME` <= 30.000     |
| ?echo_file=         | X-ECHO-FILE           | Path of Directory or File        | Enable file `true`        |

#### Custom HTTP Status Code

```bash
➜ curl -I --header 'X-ECHO-CODE: 404' $ECHO_HOST
➜ curl $ECHO_HOST/?echo_code=404

HTTP/1.1 404 Not Found
```

```bash
➜ curl -I --header 'X-ECHO-CODE: 404-300' $ECHO_HOST
➜ curl $ECHO_HOST/?echo_code=404-300

HTTP/1.1 404 Not Found
HTTP/1.1 300 Multiple Choices
```

```bash
➜ for i in {1..10}
➜ do
➜    curl -I $ECHO_HOST/?echo_code=200-400-500
➜ done

HTTP/1.1 500 Internal Server Error
HTTP/1.1 400 Bad Request
HTTP/1.1 200 OK
HTTP/1.1 500 Internal Server Error
HTTP/1.1 200 OK
HTTP/1.1 500 Internal Server Error
```

#### Custom Body

```bash
➜ curl --header 'X-ECHO-BODY: amazing' $ECHO_HOST
➜ curl $ECHO_HOST/?echo_body=amazing

"amazing"
```

#### Custom Body with environment variable value

```bash
➜ curl --header 'X-ECHO-ENV-BODY: HOSTNAME' $ECHO_HOST
➜ curl $ECHO_HOST/?echo_env_body=HOSTNAME

"c53a9ed79fa2"
```

```bash
➜ for i in {1..10}
➜ do
➜    curl $ECHO_HOST/?echo_env_body=HOSTNAME
➜ done

"c53a9ed79fa2"
"f10c3af61e40"
"c53a9ed79fa2"
"f10c3af61e40"
"c53a9ed79fa2"
```

#### Custom Headers

```bash
➜ curl --header 'X-ECHO-HEADER: One:1' $ECHO_HOST
➜ curl $ECHO_HOST/?echo_header=One:1

HTTP/1.1 200 OK
One: 1
```

```bash
➜ curl --header 'X-ECHO-HEADER: One:1, Two:2' $ECHO_HOST
➜ curl "$ECHO_HOST/?echo_header=One:1,%20Two:2"

HTTP/1.1 200 OK
One: 1
Two: 2
```

#### Custom response latency

```bash
➜ curl --header 'X-ECHO-TIME: 5000' $ECHO_HOST
➜ curl "$ECHO_HOST/?echo_time=5000"

⏳... 5000 ms
```

You can change default validations with

| ENVIRONMENT                | CLI                       | Default  |
|----------------------------|---------------------------| ---------|
| CONTROLS__TIMES__MIN       | --controls:times:min      | `0`      |
| CONTROLS__TIMES__MAX       | --controls:times:max      | `60000`  |

*(Latency is defined in milliseconds)*

#### File/Folder explorer

```bash
➜ curl --header 'X-ECHO-FILE: /' $ECHO_HOST
➜ curl "$ECHO_HOST/?echo_file=/"

["app", "bin", "etc", "usr", "var"]
```

#### Combine custom actions

```bash
➜ curl --header 'X-ECHO-CODE: 401' --header 'X-ECHO-BODY: Oups' $ECHO_HOST
➜ curl "$ECHO_HOST/?echo_body=Oups&echo_code=401"

HTTP/1.1 401 Unauthorized
"Oups"
```

### Change default Queries/Request commands

| Environment                        | CLI                                | Default            |
|------------------------------------|------------------------------------|--------------------|
| COMMANDS__HTTPBODY__QUERY          | --commands:httpBody:query          | `echo_body`        |
| COMMANDS__HTTPBODY__HEADER         | --commands:httpBody:header         | `x-echo-body`      |
| COMMANDS__HTTPENVBODY__QUERY       | --commands:httpEnvBody:query       | `echo_env_body`    |
| COMMANDS__HTTPENVBODY__HEADER      | --commands:httpEnvBody:header      | `x-echo-env-body`  |
| COMMANDS__HTTPCODE__QUERY          | --commands:httpCode:query          | `echo_code`        |
| COMMANDS__HTTPCODE__HEADER         | --commands:httpCode:header         | `x-echo-code`      |
| COMMANDS__HTTPHEADERS__QUERY       | --commands:httpHeaders:query       | `echo_header`      |
| COMMANDS__HTTPHEADERS__HEADER      | --commands:httpHeaders:header      | `x-echo-header`    |
| COMMANDS__TIME__QUERY              | --commands:time:query              | `echo_time`        |
| COMMANDS__TIME__HEADER             | --commands:time:header             | `x-echo-time`      |
| COMMANDS__FILE__QUERY              | --commands:file:query              | `echo_file`        |
| COMMANDS__FILE__HEADER             | --commands:file:header             | `x-echo-file`      |
