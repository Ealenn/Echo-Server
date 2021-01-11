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
- Request Headers / Response Headers
- Environment variables
- Control via Headers/Query
- Folders and Files

Docker OS/ARCH :

- linux/amd64
- linux/arm/v6
- linux/arm/v7
- linux/arm64/v8
- linux/ppc64le
- linux/s390x

![docker](https://ealenn.github.io/Echo-Server/assets/images/docker.png)

## <a name='Tableofcontents'></a>Table of contents

<!-- vscode-markdown-toc -->
* [Table of contents](#Tableofcontents)
* [Configuration](#Configuration)
* [Use Echo-Server](#UseEcho-Server)
	* [Custom responses](#Customresponses)
		* [Custom HTTP Status Code](#CustomHTTPStatusCode)
		* [Custom Body](#CustomBody)
		* [Custom Body with Environment variable value](#CustomBodywithEnvironmentvariablevalue)
		* [Custom Headers](#CustomHeaders)
		* [Custom response latency](#Customresponselatency)
		* [File/Folder explorer](#FileFolderexplorer)
		* [Combine custom actions](#Combinecustomactions)
* [Change default Queries/Request commands](#ChangedefaultQueriesRequestcommands)
* [Setting up](#Settingup)
	* [Docker](#Docker)
	* [Docker-Compose](#Docker-Compose)
	* [Kubernetes](#Kubernetes)
	* [Kubernetes with Helm](#KuberneteswithHelm)
* [Contributing](#Contributing)
* [Versioning](#Versioning)
* [License](#License)
* [Local development](#Localdevelopment)
	* [Run Echo-Server](#RunEcho-Server)
	* [Run documentation server](#Rundocumentationserver)
	* [Run tests](#Runtests)
	* [Release notes](#Releasenotes)
	* [Update Helm Chart](#UpdateHelmChart)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='Configuration'></a>Configuration

| Environment                        | Helm                             | CLI                                | Default       |
|------------------------------------|----------------------------------|------------------------------------|---------------|
| PORT                               | service.port                     | --port                             | `80`          |
| LOGS__IGNORE__PING                 | application.logs.ignore.ping     | --logs:ignore:ping                 | `false`       |
| ENABLE__HOST                       | application.enable.host          | --enable:host                      | `true`        |
| ENABLE__HTTP                       | application.enable.http          | --enable:http                      | `true`        |
| ENABLE__REQUEST                    | application.enable.request       | --enable:request                   | `true`        |
| ENABLE__HEADER                     | application.enable.header        | --enable:header                    | `true`        |
| ENABLE__ENVIRONMENT                | application.enable.environment   | --enable:environment               | `true`        |
| ENABLE__FILE                       | application.enable.file          | --enable:file                      | `true`        |

## <a name='UseEcho-Server'></a>Use Echo-Server

![curl](https://ealenn.github.io/Echo-Server/assets/images/curl.png)

I use [jq](https://stedolan.github.io/jq) for nice `curl` results ;)

### <a name='Customresponses'></a>Custom responses

| Query               | Header                | Content                          | Conditions                |
|---------------------|-----------------------|----------------------------------| ------------------------- |
| ?echo_code=         | X-ECHO-CODE           | HTTP code `200`, `404`           | 200 <= `CODE` <= 599      |
|                     |                       | `404-401` or `200-500-301`       |                           |
| ?echo_body=         | X-ECHO-BODY           | Body message                     |                           |
| ?echo_env_body=     | X-ECHO-ENV-BODY       | The key of environment variable  | Enable environment `true` |
| ?echo_header=       | X-ECHO-HEADER         | Response Header `Lang: en-US`    | Enable header `true`      |
| ?echo_time=         | X-ECHO-TIME           | Wait time in `ms`                | 0 <= `TIME` <= 30.000     |
| ?echo_file=         | X-ECHO-FILE           | Path of Directory or File        | Enable file `true`        |

#### <a name='CustomHTTPStatusCode'></a>Custom HTTP Status Code

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

#### <a name='CustomBody'></a>Custom Body

```bash
➜ curl --header 'X-ECHO-BODY: amazing' $ECHO_HOST
➜ curl $ECHO_HOST/?echo_body=amazing

"amazing"
```

#### <a name='CustomBodywithEnvironmentvariablevalue'></a>Custom Body with Environment variable value

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

#### <a name='CustomHeaders'></a>Custom Headers

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

#### <a name='Customresponselatency'></a>Custom response latency

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

#### <a name='FileFolderexplorer'></a>File/Folder explorer

```bash
➜ curl --header 'X-ECHO-FILE: /' $ECHO_HOST
➜ curl "$ECHO_HOST/?echo_file=/"

["app", "bin", "etc", "usr", "var"]
```

#### <a name='Combinecustomactions'></a>Combine custom actions

```bash
➜ curl --header 'X-ECHO-CODE: 401' --header 'X-ECHO-BODY: Oups' $ECHO_HOST
➜ curl "$ECHO_HOST/?echo_body=Oups&echo_code=401"

HTTP/1.1 401 Unauthorized
"Oups"
```

## <a name='ChangedefaultQueriesRequestcommands'></a>Change default Queries/Request commands

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

## <a name='Settingup'></a>Setting up

### <a name='Docker'></a>Docker

[Read the docs](https://ealenn.github.io/Echo-Server/pages/docker.html)

```bash
docker run -p 3000:80 ealen/echo-server
```

### <a name='Docker-Compose'></a>Docker-Compose

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

### <a name='Kubernetes'></a>Kubernetes

[Read the docs](https://ealenn.github.io/Echo-Server/pages/kubernetes.html)

```bash
curl -sL https://raw.githubusercontent.com/Ealenn/Echo-Server/master/docs/examples/echo.kube.yaml | kubectl apply -f -
```

### <a name='KuberneteswithHelm'></a>Kubernetes with Helm

[Read the docs](https://ealenn.github.io/Echo-Server/pages/helm.html) - [Helm Hub](https://hub.helm.sh/charts/ealenn/echo-server)

```bash
helm repo add ealenn https://ealenn.github.io/charts
helm repo update
helm install --set ingress.enable=true --name echoserver ealenn/echo-server
```

---

## <a name='Contributing'></a>Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## <a name='Versioning'></a>Versioning

We use [SemVer](http://semver.org/) for versioning.
For the versions available, see the [tags on this repository](https://github.com/Ealenn/Echo-Server/releases).

## <a name='License'></a>License

This project is licensed under the GNU Lesser General Public License - see the [LICENSE.md](LICENSE.md) file for details.

---

## <a name='Localdevelopment'></a>Local development

### <a name='RunEcho-Server'></a>Run Echo-Server

```bash
npm install
node ./src/webserver --port 3000
# OR
PORT=3000 npm run start
```

### <a name='Rundocumentationserver'></a>Run documentation server

```bash
cd ./docs
docker compose up
```

### <a name='Runtests'></a>Run tests

```bash
npm install
# Without code coverage
npm run test
# With code coverage
npm run test-with-coverage
```

### <a name='Releasenotes'></a>Release notes

```bash
git log --pretty=oneline
```

### <a name='UpdateHelmChart'></a>Update Helm Chart

=> [https://github.com/Ealenn/charts/tree/master/charts/echo-server](https://github.com/Ealenn/charts/tree/master/charts/echo-server)
