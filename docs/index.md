---
layout: default
title: Documentation
has_children: true
nav_order: 1
---

# Echo-Server / Docker / Kubernetes / Helm

[![Codecov](https://img.shields.io/codecov/c/github/ealenn/echo-server?style=for-the-badge&logo=codecov)](https://codecov.io/gh/Ealenn/Echo-Server)
[![GitHub stars](https://img.shields.io/github/stars/Ealenn/Echo-Server?style=for-the-badge&logo=github)](https://github.com/Ealenn/Echo-Server/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Ealenn/Echo-Server?style=for-the-badge&logo=github)](https://github.com/Ealenn/Echo-Server/issues)
[![DockerHub](https://img.shields.io/docker/pulls/ealen/echo-server.svg?style=for-the-badge&logo=docker)](https://hub.docker.com/repository/docker/ealen/echo-server)
[![DockerHub](https://img.shields.io/badge/SIZE-%3C%2013%20MB-1488C6?style=for-the-badge&logo=docker)](https://hub.docker.com/repository/docker/ealen/echo-server)

An echo server is a server that replicates the request sent by the client and sends it back.

![docker](https://ealenn.github.io/Echo-Server/assets/images/docker.png)

Available:

- GET / POST / PUT / PATCH / DELETE
- Request (Query, Body, IPs, Host, Urls...)
- Headers
- Environment variables
- Control via Headers/Query

## Table of contents

{: .no_toc .text-delta }

- [Docker](/docker.html) : Use docker container
- [Docker-Compose](/docker-compose.html) : Integration in docker-compose
- [Kubernetes](/kubernetes.html) Deploy with `kubectl`
- [Helm](/helm.html) Use `echo-server` helm repository and override values
- [Global Configuration](/configuration.html) Environments variables, CLI arguments...

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

---

{% include_relative pages/includes/section-configuration.md %}
