# Echo-Server / Docker / Kubernetes / Helm

[![Codecov](https://img.shields.io/codecov/c/github/ealenn/echo-server?style=for-the-badge&logo=codecov)](https://codecov.io/gh/Ealenn/Echo-Server)
[![GitHub stars](https://img.shields.io/github/stars/Ealenn/Echo-Server?style=for-the-badge&logo=github)](https://github.com/Ealenn/Echo-Server/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Ealenn/Echo-Server?style=for-the-badge&logo=github)](https://github.com/Ealenn/Echo-Server/issues)
[![DockerHub](https://img.shields.io/docker/pulls/ealen/echo-server.svg?style=for-the-badge&logo=docker)](https://hub.docker.com/repository/docker/ealen/echo-server)
[![DockerHub](https://img.shields.io/badge/SIZE-%3C%2013%20MB-1488C6?style=for-the-badge&logo=docker)](https://hub.docker.com/repository/docker/ealen/echo-server)

> Read the docs : [https://ealenn.github.io/Echo-Server](https://ealenn.github.io/Echo-Server) - Read the [release notes](https://github.com/Ealenn/Echo-Server/releases)

An echo server is a server that replicates the request sent by the client and sends it back.

Available:

- GET / POST / PUT / PATCH / DELETE
- Request (Query, Body, IPs, Host, Urls...)
- Headers
- Environment variables
- Control via Headers/Query

![docker](https://ealenn.github.io/Echo-Server/assets/images/docker.png)

## Table of contents

- [Docker](https://ealenn.github.io/Echo-Server/pages/docker.html) : Use docker container
- [Docker-Compose](https://ealenn.github.io/Echo-Server/pages/docker-compose.html) : Integration in docker-compose
- [Kubernetes](https://ealenn.github.io/Echo-Server/pages/kubernetes.html) Deploy with `kubectl`
- [Helm](https://ealenn.github.io/Echo-Server/pages/helm.html) Use `echo-server` helm repository and override values

## Configuration

| Environment         | Helm                           | CLI                   | Default       |
|---------------------|--------------------------------|-----------------------|---------------|
| PORT                | service.port                   | --port                | `80`          |
| LOGS__IGNORE__PING  | application.logs.ignore.ping   | --logs:ignore:ping    | `false`       |
| ENABLE__HOST        | application.enable.host        | --enable:host         | `true`        |
| ENABLE__HTTP        | application.enable.http        | --enable:http         | `true`        |
| ENABLE__REQUEST     | application.enable.request     | --enable:request      | `true`        |
| ENABLE__ENVIRONMENT | application.enable.environment | --enable:environment  | `true`        |

## Default response

![curl](https://ealenn.github.io/Echo-Server/assets/images/curl.png)

## Custom response

| Query               | Header              | Content                          | Conditions                |
|---------------------|---------------------|----------------------------------| ------------------------- |
| ?echo_code=         | ECHO_CODE           | HTTP code (ex `200`, `404`)      | 200 >= `CODE` <= 599      |
| ?echo_body=         | ECHO_BODY           | Body message                     |                           |
| ?echo_env_body=     | ECHO_ENV_BODY       | The key of environment variable  | Enable environment `true` |

```bash
➜ curl -I --header 'ECHO_CODE: 404' localhost:3000
➜ curl localhost:3000/?echo_code=404

HTTP/1.1 404 Not Found
```

```bash
➜ curl --header 'ECHO_BODY: amazing' localhost:3000
➜ curl localhost:3000/?echo_env_body=amazing

"amazing"
```

```bash
➜ curl --header 'ECHO_ENV_BODY: HOME' localhost:3000
➜ curl localhost:3000/?echo_env_body=HOME

"/root"
```

## Docker

[Read the docs](https://ealenn.github.io/Echo-Server/pages/docker.html)

```bash
docker run -p 3000:80 ealen/echo-server
```

## Docker-Compose

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

## Kubernetes

[Read the docs](https://ealenn.github.io/Echo-Server/pages/kubernetes.html)

```bash
curl -sL https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.kube.yaml | kubectl apply -f -
```

## Helm

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
