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
| ?echo_code=         | X-ECHO-CODE           | HTTP code (ex `200`, `404`)      | 200 <= `CODE` <= 599      |
| ?echo_body=         | X-ECHO-BODY           | Body message                     |                           |
| ?echo_env_body=     | X-ECHO-ENV-BODY       | The key of environment variable  | Enable environment `true` |
| ?echo_time=         | X-ECHO-TIME           | Wait time in `ms`                | 0 <= `TIME` <= 30.000     |

#### Custom HTTP Status Code

```bash
➜ curl -I --header 'X-ECHO-CODE: 404' $ECHO_HOST
➜ curl $ECHO_HOST/?echo_code=404

HTTP/1.1 404 Not Found
```

#### Custom Body

```bash
➜ curl --header 'X-ECHO-BODY: amazing' $ECHO_HOST
➜ curl $ECHO_HOST/?echo_body=amazing

"amazing"
```

#### Custom Body with Environment variable value

```bash
➜ curl --header 'X-ECHO-ENV-BODY: HOME' $ECHO_HOST
➜ curl $ECHO_HOST/?echo_env_body=HOME

"/root"
```

#### Custom response latency

```bash
➜ curl --header 'X-ECHO-TIME: 5000' $ECHO_HOST
➜ curl "$ECHO_HOST/?echo_time=5000"

⏳... 5000 ms
```

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
