# Echo-Server / Docker / Kubernetes / Helm

[![GitHub stars](https://img.shields.io/github/stars/Ealenn/Echo-Server?style=for-the-badge)](https://github.com/Ealenn/Echo-Server/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Ealenn/Echo-Server?style=for-the-badge)](https://github.com/Ealenn/Echo-Server/issues)
[![DockerHub](https://img.shields.io/docker/pulls/ealen/echo-server.svg?style=for-the-badge)](https://hub.docker.com/repository/docker/ealen/echo-server)

> Read the docs : [https://ealenn.github.io/Echo-Server](https://ealenn.github.io/Echo-Server)

An echo server is a server that replicates the request sent by the client and sends it back.

Available:

- GET / POST / PUT / PATCH / DELETE
- Request (Query, Body, IPs, Host, Urls...)
- Headers
- Environment variables

![docker cli](./docs/assets/images/docker.gif)

## Table of contents

- [Docker](https://ealenn.github.io/Echo-Server/docker.html) : Use docker container
- [Docker-Compose](https://ealenn.github.io/Echo-Server/docker-compose.html) : Integration in docker-compose
- [Kubernetes](https://ealenn.github.io/Echo-Server/kubernetes.html) Deploy with `kubectl`
- [Helm](https://ealenn.github.io/Echo-Server/helm.html) Use `echo-server` helm repository and override values
- [Global Configuration](https://ealenn.github.io/Echo-Server/configuration.html) Environments variables, CLI arguments...

## Configuration

| Environment         | Helm                           | CLI                   | Default       |
|---------------------|--------------------------------|-----------------------|---------------|
| PORT                | service.port                   | --port                | `80`          |
| LOGS__IGNORE__PING  | application.logs.ignore.ping   | --logs:ignore:ping    | `false`       |
| ENABLE__HOST        | application.enable.host        | --enable:host         | `true`        |
| ENABLE__HTTP        | application.enable.http        | --enable:http         | `true`        |
| ENABLE__REQUEST     | application.enable.request     | --enable:request      | `true`        |
| ENABLE__ENVIRONMENT | application.enable.environment | --enable:environment  | `true`        |

## Docker

[Read the docs](https://ealenn.github.io/Echo-Server)

```sh
docker run -p 3000:80 ealen/echo-server
```

## Docker-Compose

[Read the docs](https://ealenn.github.io/Echo-Server)

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

[Read the docs](https://ealenn.github.io/Echo-Server)

```sh
curl -sL https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.kube.yaml | kubectl apply -f -
```

## Helm

[Read the docs](https://ealenn.github.io/Echo-Server)

```sh
helm repo add ealenn https://ealenn.github.io/charts
helm repo update
curl https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.helm.yaml --output ./example.values.yaml
helm upgrade -i -f ./example.values.yaml echoserver ealenn/echo-server --namespace echoserver --force
```

---

## Local development

### Run Echo-Server

```sh
npm install
node ./src/webserver --port 3000
# OR
PORT=3000 npm run start
```

### Run documentation server

```sh
cd ./docs
docker compose up
```

### Run tests

```sh
npm install
# Without code coverage
npm run test
# With code coverage
npm run test-with-coverage
```

### Update Helm Chart

=> [https://github.com/Ealenn/charts/tree/master/charts/echo-server](https://github.com/Ealenn/charts/tree/master/charts/echo-server)
