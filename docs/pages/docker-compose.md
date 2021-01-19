---
layout: default
title: Docker-Compose
parent: Documentation
nav_order: 3
---
# Docker-Compose

List of available [Docker Tags](https://hub.docker.com/r/ealen/echo-server/tags) - Read the [release notes](https://github.com/Ealenn/Echo-Server/releases)

## Compose File

```yaml
version: '3'
services:
  echo-server:
    image: ealen/echo-server:latest
    ports:
      - 3000:80
```

### Example

You can use environment variables

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

Or use Seq and view logs

```yaml
version: "3"

services:
  echo:
    image: ealen/echo-server:latest
    environment: 
      PORT: 80
      LOGS__SEQ__ENABLED: "true"
      LOGS__SEQ__SERVER: "http://seq:5341"
    ports: 
      - 3000:80

  seq:
    image: datalust/seq:latest
    environment: 
      ACCEPT_EULA: "Y"
    ports:
      - 3010:80
```

## Run Echo Server

```sh
docker-compose up -d
```

{% include_relative includes/section-configuration.md %}

---

{% include_relative includes/section-tests.md %}
