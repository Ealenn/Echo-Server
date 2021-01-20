---
layout: default
title: Docker-Compose
parent: Quick-Start
nav_order: 3
---
# Docker-Compose
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Run

```yaml
version: "3"
services:
  echo-server:
    image: ealen/echo-server:{{ site.github.releases[0].tag_name }}
    ports:
      - 3000:80
```

```sh
➜ docker-compose up -d
➜ curl -I localhost:3000
HTTP/1.1 200 OK
```

## Configuration

You can use environment variables [More information](https://ealenn.github.io/Echo-Server/pages/configuration)

```yaml
version: "3"
services:
  echo-server:
    image: ealen/echo-server:{{ site.github.releases[0].tag_name }}
    environment:
      - ENABLE__ENVIRONMENT=false
    ports:
      - 3000:80
```

## Loggers

[More information](https://ealenn.github.io/Echo-Server/pages/configuration/loggers)

```yaml
version: "3"
services:
  echo:
    image: ealen/echo-server:{{ site.github.releases[0].tag_name }}
    environment: 
      PORT: 80
      LOGS__SEQ__ENABLED: "true"
      LOGS__SEQ__SERVER: "http://seq:5341"
    ports: 
      - 3000:80

  seq:
    image: datalust/seq:{{ site.github.releases[0].tag_name }}
    environment: 
      ACCEPT_EULA: "Y"
    ports:
      - 3010:80
```

## Examples

{% include_relative includes/section-examples.md host="localhost:3000" %}