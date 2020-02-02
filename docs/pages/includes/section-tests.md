<!---
exclude: true
nav_exclude: true
--->

## Use Echo-Server

- ECHO_HOST = `localhost:3000` or `echoserver.cluster.local` for Kubernetes by default.

I use [jq](https://stedolan.github.io/jq) for nice `curl` results ;)

![curl](https://ealenn.github.io/Echo-Server/assets/images/curl.png)

### Custom responses

| Query               | Header              | Content                          | Conditions                |
|---------------------|---------------------|----------------------------------| ------------------------- |
| ?echo_code=         | ECHO_CODE           | HTTP code (ex `200`, `404`)      | 200 <= `CODE` <= 599      |
| ?echo_body=         | ECHO_BODY           | Body message                     |                           |
| ?echo_env_body=     | ECHO_ENV_BODY       | The key of environment variable  | Enable environment `true` |
| ?echo_time=         | ECHO_TIME           | Wait time in `ms`                | 0 <= `TIME` <= 30.000     |

#### Custom HTTP Status Code

```bash
➜ curl -I --header 'ECHO_CODE: 404' $ECHO_HOST
➜ curl $ECHO_HOST/?echo_code=404

HTTP/1.1 404 Not Found
```

#### Custom Body

```bash
➜ curl --header 'ECHO_BODY: amazing' $ECHO_HOST
➜ curl $ECHO_HOST/?echo_body=amazing

"amazing"
```

#### Custom Body with Environment variable value

```bash
➜ curl --header 'ECHO_ENV_BODY: HOME' $ECHO_HOST
➜ curl $ECHO_HOST/?echo_env_body=HOME

"/root"
```

#### Custom response latency

```bash
➜ curl --header 'ECHO_TIME: 5000' $ECHO_HOST
➜ curl "$ECHO_HOST/?echo_time=5000"

⏳... 5000 ms
```

#### Combine custom actions

```bash
➜ curl --header 'ECHO_CODE: 401' --header 'ECHO_BODY: Oups' $ECHO_HOST
➜ curl "$ECHO_HOST/?echo_body=Oups&echo_code=401"

HTTP/1.1 401 Unauthorized
"Oups"
```
