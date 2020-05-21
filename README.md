# Echo-Server / Docker / Kubernetes / Helm

[![Codecov](https://img.shields.io/codecov/c/github/ealenn/echo-server?style=for-the-badge&logo=codecov)](https://codecov.io/gh/Ealenn/Echo-Server)
[![GitHub stars](https://img.shields.io/github/stars/Ealenn/Echo-Server?style=for-the-badge&logo=github)](https://github.com/Ealenn/Echo-Server/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Ealenn/Echo-Server?style=for-the-badge&logo=github)](https://github.com/Ealenn/Echo-Server/issues)
[![DockerHub](https://img.shields.io/docker/pulls/ealen/echo-server.svg?style=for-the-badge&logo=docker)](https://hub.docker.com/repository/docker/ealen/echo-server)
[![DockerHub](https://img.shields.io/badge/SIZE-%3C%2030%20MB-1488C6?style=for-the-badge&logo=docker)](https://hub.docker.com/repository/docker/ealen/echo-server)

> Read the docs : [https://ealenn.github.io/Echo-Server](https://ealenn.github.io/Echo-Server) - Read the [release notes](https://github.com/Ealenn/Echo-Server/releases)

An echo server is a server that replicates the request sent by the client and sends it back.

Available:

- GET / POST / PUT / PATCH / DELETE
- Request (Query, Body, IPs, Host, Urls...)
- Headers
- Environment variables
- Control via Headers/Query

Docker OS/ARCH :

- linux/amd64
- linux/arm/v6
- linux/arm/v7
- linux/arm64
- linux/386

![docker](https://ealenn.github.io/Echo-Server/assets/images/docker.png)

## Table of contents

- [Docker](https://ealenn.github.io/Echo-Server/pages/docker.html) : Use docker container
- [Docker-Compose](https://ealenn.github.io/Echo-Server/pages/docker-compose.html) : Integration in docker-compose
- [Kubernetes](https://ealenn.github.io/Echo-Server/pages/kubernetes.html) Deploy with `kubectl`
- [Helm](https://ealenn.github.io/Echo-Server/pages/helm.html) Use `echo-server` helm repository and override values

## Configuration

| Environment                        | Helm                             | CLI                                | Default       |
|------------------------------------|----------------------------------|------------------------------------|---------------|
| PORT                               | service.port                     | --port                             | `80`          |
| LOGS__IGNORE__PING                 | application.logs.ignore.ping     | --logs:ignore:ping                 | `false`       |
| ENABLE__HOST                       | application.enable.host          | --enable:host                      | `true`        |
| ENABLE__HTTP                       | application.enable.http          | --enable:http                      | `true`        |
| ENABLE__REQUEST                    | application.enable.request       | --enable:request                   | `true`        |
| ENABLE__ENVIRONMENT                | application.enable.environment   | --enable:environment               | `true`        |
| ENABLE__FILE                       | application.enable.file          | --enable:file                      | `true`        |

## Use Echo-Server

![curl](https://ealenn.github.io/Echo-Server/assets/images/curl.png)

I use [jq](https://stedolan.github.io/jq) for nice `curl` results ;)

### Custom responses

| Query               | Header                | Content                          | Conditions                |
|---------------------|-----------------------|----------------------------------| ------------------------- |
| ?echo_code=         | X-ECHO-CODE           | HTTP code `200`, `404`           | 200 <= `CODE` <= 599      |
|                     |                       | `404-401` or `200-500-301`       |                           |
| ?echo_body=         | X-ECHO-BODY           | Body message                     |                           |
| ?echo_env_body=     | X-ECHO-ENV-BODY       | The key of environment variable  | Enable environment `true` |
| ?echo_time=         | X-ECHO-TIME           | Wait time in `ms`                | 0 <= `TIME` <= 30.000     |
| ?echo_file=         | X-ECHO-FILE           | Path of Directory or File        | Enable file `true`        |

#### Custom HTTP Status Code

ECHO_HOST = `localhost:3000` or `echoserver.cluster.local` for Kubernetes by default.

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

#### Custom Body with Environment variable value

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

## Setting up

### Docker

[Read the docs](https://ealenn.github.io/Echo-Server/pages/docker.html)

```bash
docker run -p 3000:80 ealen/echo-server
```

### Docker-Compose

[Read the docs](https://ealenn.github.io/Echo-Server/pages/docker-compose.html)

```yaml
version: '3'
services:
  echo-server:
    image: ealen/echo-server:latest
    environment:
      - ENABLE__ENVIRONMENT=false
    ports:
      - 3000:80
```

### Kubernetes

[Read the docs](https://ealenn.github.io/Echo-Server/pages/kubernetes.html)

```bash
curl -sL https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.kube.yaml | kubectl apply -f -
```

### Kubernetes with Helm

[Read the docs](https://ealenn.github.io/Echo-Server/pages/helm.html) - [Helm Hub](https://hub.helm.sh/charts/ealenn/echo-server)

```bash
helm repo add ealenn https://ealenn.github.io/charts
helm repo update
helm install --set ingress.enable=true --name echoserver ealenn/echo-server
```

---

## Local development

### Run Echo-Server

```bash
npm install
node ./src/webserver --port 3000
# OR
PORT=3000 npm run start
```

### Run documentation server

```bash
cd ./docs
docker compose up
```

### Run tests

```bash
npm install
# Without code coverage
npm run test
# With code coverage
npm run test-with-coverage
```

### Release notes

```bash
git log --pretty=oneline
```

### Update Helm Chart

=> [https://github.com/Ealenn/charts/tree/master/charts/echo-server](https://github.com/Ealenn/charts/tree/master/charts/echo-server)
