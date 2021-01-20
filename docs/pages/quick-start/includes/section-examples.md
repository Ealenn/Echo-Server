<!---
exclude: true
nav_exclude: true
--->

### Custom responses
{: .no_toc }

| Query               | Header                | Content                          | Conditions                |
|---------------------|-----------------------|----------------------------------| ------------------------- |
| ?echo_code=         | X-ECHO-CODE           | HTTP code `200`, `404`           | 200 <= `CODE` <= 599      |
|                     |                       | `404-401` or `200-500-301`       |                           |
| ?echo_body=         | X-ECHO-BODY           | Body message                     |                           |
| ?echo_env_body=     | X-ECHO-ENV-BODY       | The key of environment variable  | Enable environment `true` |
| ?echo_header=       | X-ECHO-HEADER         | Response Header `Lang: en-US`    | Enable header `true`      |
| ?echo_time=         | X-ECHO-TIME           | Wait time in `ms`                | 0 <= `TIME` <= 60.000     |
| ?echo_file=         | X-ECHO-FILE           | Path of Directory or File        | Enable file `true`        |

You can change [commands](https://ealenn.github.io/Echo-Server/pages/configuration/commands) and [conditions](https://ealenn.github.io/Echo-Server/pages/configuration/configuration).

#### Custom HTTP Status Code
{: .no_toc }

```bash
➜ curl -I --header 'X-ECHO-CODE: 404' {{ include.host }}
➜ curl -I {{ include.host }}/?echo_code=404

HTTP/1.1 404 Not Found
```

```bash
➜ curl -I --header 'X-ECHO-CODE: 404-300' {{ include.host }}
➜ curl -I {{ include.host }}/?echo_code=404-300

HTTP/1.1 404 Not Found
HTTP/1.1 300 Multiple Choices
```

```bash
➜ for i in {1..10}
➜ do
➜    curl -I {{ include.host }}/?echo_code=200-400-500
➜ done

HTTP/1.1 500 Internal Server Error
HTTP/1.1 400 Bad Request
HTTP/1.1 200 OK
HTTP/1.1 500 Internal Server Error
HTTP/1.1 200 OK
HTTP/1.1 500 Internal Server Error
```

#### Custom Body
{: .no_toc }

```bash
➜ curl --header 'X-ECHO-BODY: amazing' {{ include.host }}
➜ curl {{ include.host }}/?echo_body=amazing

"amazing"
```

#### Custom Body with environment variable value
{: .no_toc }

```bash
➜ curl --header 'X-ECHO-ENV-BODY: HOSTNAME' {{ include.host }}
➜ curl {{ include.host }}/?echo_env_body=HOSTNAME

"c53a9ed79fa2"
```

```bash
➜ for i in {1..10}
➜ do
➜    curl {{ include.host }}/?echo_env_body=HOSTNAME
➜ done

"c53a9ed79fa2"
"f10c3af61e40"
"c53a9ed79fa2"
"f10c3af61e40"
"c53a9ed79fa2"
```

#### Custom Headers
{: .no_toc }

```bash
➜ curl --header 'X-ECHO-HEADER: One:1' {{ include.host }}
➜ curl {{ include.host }}/?echo_header=One:1

HTTP/1.1 200 OK
One: 1
```

```bash
➜ curl --header 'X-ECHO-HEADER: One:1, Two:2' {{ include.host }}
➜ curl "{{ include.host }}/?echo_header=One:1,%20Two:2"

HTTP/1.1 200 OK
One: 1
Two: 2
```

#### Custom response latency
{: .no_toc }

```bash
➜ curl --header 'X-ECHO-TIME: 5000' {{ include.host }}
➜ curl "{{ include.host }}/?echo_time=5000"

⏳... 5000 ms
```

You can change default validations with

| ENVIRONMENT                | CLI                       | Default  |
|----------------------------|---------------------------| ---------|
| CONTROLS__TIMES__MIN       | --controls:times:min      | `0`      |
| CONTROLS__TIMES__MAX       | --controls:times:max      | `60000`  |

*(Latency is defined in milliseconds)*

#### File/Folder explorer
{: .no_toc }

```bash
➜ curl --header 'X-ECHO-FILE: /' {{ include.host }}
➜ curl "{{ include.host }}/?echo_file=/"

["app", "bin", "etc", "usr", "var"]
```

#### Combine custom actions
{: .no_toc }

```bash
➜ curl --header 'X-ECHO-CODE: 401' --header 'X-ECHO-BODY: Oups' {{ include.host }}
➜ curl "{{ include.host }}/?echo_body=Oups&echo_code=401"

HTTP/1.1 401 Unauthorized
"Oups"
```
