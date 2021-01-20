---
layout: default
title: Docker
parent: Quick-Start
nav_order: 2
---
# Docker
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

![cli docker](https://ealenn.github.io/Echo-Server/assets/images/docker.gif)

## Run

```sh
➜ docker run -d \
    -p 3000:80 \
    ealen/echo-server:{{ site.github.releases[0].tag_name }}

➜ curl -I localhost:3000
HTTP/1.1 200 OK
```

## Configuration

You can use environment variables with `-e ENV_NAME=VALUE` or CLI arguments after image's name `ealen/echo-server:{{ site.github.releases[0].tag_name }} --arg value` [More information](https://ealenn.github.io/Echo-Server/pages/configuration)

- **With environment variables:**

```sh
➜ docker run -d \
    -p 3000:80 \
    -e ENABLE__ENVIRONMENT=false
    ealen/echo-server:{{ site.github.releases[0].tag_name }}
```

- **With CLI arguments:**

```sh
➜ docker run -d \
    -p 3000:80 \
    ealen/echo-server:{{ site.github.releases[0].tag_name }} --enable:environment false
```

## Loggers

[More information](https://ealenn.github.io/Echo-Server/pages/configuration/loggers)

```sh
➜ docker run -d \
    -p 3000:80 \
    -e LOGS__SEQ__ENABLED=true \
    -e LOGS__SEQ__SERVER=http://localhost:5341 \
    ealen/echo-server:{{ site.github.releases[0].tag_name }}

➜ docker run -d \
    -p 3010:3010 \
    -p 5341:5341 \
    -e ACCEPT_EULA=Y \
    datalust/seq:{{ site.github.releases[0].tag_name }}
```

## Examples

{% include_relative includes/section-examples.md host="localhost:3000" %}